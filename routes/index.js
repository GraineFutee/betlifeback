const matches = require("./matches");

module.exports = (app) => {
  app.use("/api/matches", matches);
};
