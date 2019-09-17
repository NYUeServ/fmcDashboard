const config = require("./config.json")
const express = require('express');
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
const app = express();
require("./routes/index.js")(app)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(basicAuth({ users: config.apiKeys }))
app.listen(81, () => console.log("Listening on port 81"));