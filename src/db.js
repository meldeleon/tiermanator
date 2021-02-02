var AWS = require("aws-sdk")

const dynamodb = new AWS.DynamoDB({
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

export let data = f()

function f() {
  var params = {
    TableName: "viewers",
    AttributesToGet: ["login", "index", "profile_image_url", "tier"],
  }
  let convertedData = []
  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
      return
    } else {
      convertedData = data["Items"]
      console.log(convertedData)
    }
  })
  return convertedData
}
