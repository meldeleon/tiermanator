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
    login: "mewtru",
    place: 0,
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/0804d2ae-7909-410f-8304-8a44c5d03850-profile_image-150x150.png",
    tier: "s",
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
