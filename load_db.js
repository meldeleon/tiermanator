var AWS = require("aws-sdk")
var fs = require("fs")

AWS.config.update({
  region: "us-west-2",
})

var docClient = new AWS.DynamoDB.DocumentClient()

console.log("Importing users into DynamoDB. Please wait.")

let parameters = {
  TableName: "viewers",
  Item: {
    login: "beldathas",
    index: 0,
    profile_image_url:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/13e5fa74-defa-11e9-809c-784f43822e80-profile_image-150x150.png",
    tier: "d",
  },
}

docClient.put(parameters, function (err, data) {
  if (err) {
    console.error(
      "Unable to add function",
      ". Error JSON:",
      JSON.stringify(err, null, 2)
    )
  } else {
    console.log("PutItem succeeded")
  }
})
