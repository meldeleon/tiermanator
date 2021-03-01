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
    login: "theendlessriver",
    place: 0,
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/theendlessriver-profile_image-c2bc121e2304c99e-300x300.jpeg",
    tier: "c",
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
