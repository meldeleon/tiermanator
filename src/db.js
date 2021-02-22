import { viewers1 } from "./data.js"
const fs = require("fs")
const promisify = require("util").promisify

var AWS = require("aws-sdk")
const dynamodb = new AWS.DynamoDB({
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

var params = {
  TableName: "viewers",
  AttributesToGet: ["login", "index", "profile_image_url", "tier"],
}

// promisify dynamodb.scan(param, callback(err, data)) => new function that instead of having a callback shape, returns a promise instead.

let scanPromise = promisify(dynamodb.scan).bind(dynamodb)
/*.bind 
 .scan is a member function on the prototype of dynamoDB, function reference to the prototype. This is an unbound member function. Doesn't have a this (doesn't know what object it is attached to). Reattaching itself to dynamodb object.
 */
//pour some SYNTAX SUGAR ON ME.

export async function getViewers() {
  let results = await scanPromise(params)
  console.log(results)
  let convertedData = results["Items"].map((item) =>
    AWS.DynamoDB.Converter.unmarshall(item)
  )
  let tiers = convertedData.map((item) => {
    console.log(item.tier)
    return item.tier
  })
  console.log(tiers)
  let uniqueTiers = Array.from(new Set(tiers)).sort()
  const checkForS = (item) => item === "s"
  let sIndex = uniqueTiers.findIndex(checkForS)
  indexChange(uniqueTiers, sIndex, 0)

  let localBoardstate = {
    currentViewers: convertedData,
    currentTiers: uniqueTiers,
  }
  console.log(localBoardstate)
  return localBoardstate
}

function indexChange(arr, oldIndex, newIndex) {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  console.log(arr)
  return arr
}

var docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

export function pushViewer(viewerId, rank, column) {
  let parameters = {
    TableName: "viewers",
    Key: viewerId,
    UpdateExpression: "set place = :r, tier = :c",
    ExpressionAttributeValues: {
      ":r": rank,
      ":c": column,
    },
    ReturnValues: "UPDATED_NEW",
  }
  docClient.update(parameters, function (err, data) {
    if (err) {
      console.error(
        "Unable to update viewer",
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      )
    } else {
      console.log("PutItem succeeded")
    }
  })
}
