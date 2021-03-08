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
    login: "juiceboxhero",
    place: 0,
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/6892ddf7-e97e-4909-9e52-1184156e5058-profile_image-300x300.jpg",
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
