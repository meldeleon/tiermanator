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
  AttributesToGet: ["login", "place", "profile_image_url", "tier"],
}

// promisify dynamodb.scan(param, callback(err, data)) => new function that instead of having a callback shape, returns a promise instead.

let scanPromise = promisify(dynamodb.scan).bind(dynamodb)

//we expect this function to return a data object in the format of ./example.js
export async function getViewers() {
  let scanResults = await scanPromise(params)
}

/* OLD CODE
export async function getViewers() {
  let results = await scanPromise(params)
  console.log(results)
  let convertedData = results["Items"].map((item) =>
    AWS.DynamoDB.Converter.unmarshall(item)
  )
  let tiersFromDb = convertedData.map((item) => {
    console.log(item.tier)
    return item.tier
  })
  let uniqueTiers = Array.from(new Set(tiersFromDb)).sort()
  const checkForS = (item) => item === "s"
  let sIndex = uniqueTiers.findIndex(checkForS)
  indexChange(uniqueTiers, sIndex, 0)
  let tiersToExport = {}
  uniqueTiers.map((tier) => {
    tiersToExport[tier] = []
  })
  convertedData.map((viewer) => {
    tiersToExport[viewer.tier].push(viewer)
  })

  let localBoardstate = {
    tiers: tiersToExport,
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
*/

var docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

export function pushViewer(viewerId, place, column) {
  let parameters = {
    TableName: "viewers",
    Key: {
      login: viewerId,
    },
    UpdateExpression: "set place = :r, tier = :c",
    ExpressionAttributeValues: {
      ":r": place,
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
      console.log("Updateitem succeeded")
    }
  })
}
