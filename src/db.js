const fs = require("fs")
const promisify = require("util").promisify

var AWS = require("aws-sdk")
var docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

var params = {
  TableName: "viewers",
  AttributesToGet: ["login", "place", "profile_image_url", "tier"],
}

// promisify dynamodb.scan(param, callback(err, data)) => new function that instead of having a callback shape, returns a promise instead.

let scanPromise = promisify(docClient.scan).bind(docClient)

//we expect this function to return a data object in the format of ./example.js
export async function getViewers() {
  //scan db for raw viewer data
  let scanResults = await scanPromise(params)
  let viewersArray = scanResults["Items"]
  // grab unique tiers, sort alphabetically
  let tiersFromResults = Array.from(
    new Set(
      viewersArray.map((viewer) => {
        return viewer.tier
      })
    )
  ).sort()
  //pull S on top, because Tier lists are gor gamers.
  const checkForS = (item) => item === "s"
  let sIndex = tiersFromResults.findIndex(checkForS)
  indexChange(tiersFromResults, sIndex, 0)
  console.log(tiersFromResults)
  let data = {}
  tiersFromResults.forEach((tier) => {
    data[tier] = []
  })
  console.log(data)
  viewersArray.forEach((viewer) => {
    data[viewer.tier].push(viewer)
  })
  Object.keys(data).forEach((tier) => {
    data[tier].sort((a, b) => {
      return a.place - b.place
    })
  })
  return data
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

export function pushViewer(login, place, column) {
  let viewerUpdateParams = {
    TableName: "viewers",
    Key: {
      login: login,
    },
    UpdateExpression: "set place = :r, tier = :c",
    ExpressionAttributeValues: {
      ":r": place,
      ":c": column,
    },
    ReturnValues: "UPDATED_NEW",
  }
  docClient.update(viewerUpdateParams, function (err, data) {
    if (err) {
      console.error(
        "unable to update viwer",
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      )
    } else {
      console.log("update item succeeded")
    }
  })
}
