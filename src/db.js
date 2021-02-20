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
  let localBoardstate = {
    currentViewers: convertedData,
    currentTiers: uniqueTiers,
  }
  console.log(localBoardstate)
  return localBoardstate
}

/*
getViewers()
//loading code:
let tiers = viewers1.map((item) => {
  console.log(item.tier)
  return item.tier
})
const uniqueTiers = Array.from(new Set(tiers)).sort()
export const boardState = {
  currentViewers: viewers1,
  currentTiers: uniqueTiers,
}
//export const boardState = getViewers()

console.log(uniqueTiers)
console.log(boardState)
*/
