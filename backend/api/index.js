const app = require("../public/index.js");

const handler = async (req, res) => {
  return app.default(req, res);
};

module.exports = handler;
