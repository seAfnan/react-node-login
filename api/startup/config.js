const config = require("config");

module.exports = function () {
  if (!config.get("jwtNodeLoginKey")) {
    throw new Error("FATAL ERROR: Jwt Node Login Key not defined");
  }
};
