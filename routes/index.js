const matches = require("./matches");
const teams = require("./teams");

module.exports = (app) => {
  app.use("/api/matches", matches);
  app.use("/api/teams", teams);
};
