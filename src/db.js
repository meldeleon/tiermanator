import { viewers1 } from "./data.js"
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

var viewers = []

dynamodb.scan(params, onScan)

function onScan(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log("scan succeeded")
    let convertedData = data["Items"].map((item) =>
      viewers.push(AWS.DynamoDB.Converter.unmarshall(item))
    )
  }
}

//get list of tiers
let tiers = viewers.map((item) => {
  console.log(item.tier)
  return item.tier
})
console.log(viewers)
console.log(viewers1)
export const uniqueTiers = Array.from(new Set(tiers)).sort()

//export constants for use in app
export const boardState = {
  currentViewers: viewers1,
  currentTiers: uniqueTiers,
}
