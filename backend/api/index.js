const app = require("../public/index.js");

// Handle both CommonJS and ES module exports
const expressApp = app.default || app;

module.exports = expressApp;
