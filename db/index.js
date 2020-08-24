const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

client.connect(function (error) {
  console.log("Connected to db");
});

module.exports = {
  query: (text, params) => client.query(text, params),
};
