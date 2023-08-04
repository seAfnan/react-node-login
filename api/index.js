const express = require("express");
const app = express();
const config = require("config");

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => {
  console.log("Node app is listening on PORT http://localhost:" + port);
});

module.exports = server;
