var AWS = require("aws-sdk")
var fs = require("fs")

AWS.config.update({
  region: "us-west-2",
})

var docClient = new AWS.DynamoDB.DocumentClient()

console.log("Importing users into DynamoDB. Please wait.")

let parameters = {
  TableName: "juicebot_commands",
  Item: {
    aliases: [],
    trigger: "!codeinthedark",
    response:
      "Code in the Dark is a programming challenge where participants have to clone popular websites in css and HTML without rendering the results.",
    type: "simple",
    permission: "chat",
    requiredArguments: 0,
    autoTrigger: 20,
    timeout: 0,
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
