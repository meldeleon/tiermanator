var AWS = require("aws-sdk")
var fs = require("fs")

AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

var docClient = new AWS.DynamoDB.DocumentClient()
console.log("Importing users into DynamoDB. Please wait.")

let parameters = {
  TableName: "viewers",
  Item: {
    login: "nobo0dy_",
    place: 0,
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/a1f41360-4a51-437a-a8fd-793a43c6527a-profile_image-300x300.png",
    tier: "unranked",
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
