const matches = require("./matches");
const teams = require("./teams");
const championships = require("./championships");

module.exports = (app) => {
  app.use("/api/matches", matches);
  app.use("/api/teams", teams);
  app.use("/api/championships", championships);
};
