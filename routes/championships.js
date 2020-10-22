const Router = require("express-promise-router");
const Joi = require("joi");
const db = require("../db");

const router = new Router();

module.exports = router;

// Request functions

// Get all championships
router.get("/", async (req, res) => {
  let queryString = `SELECT * FROM championships;`;
  console.log(`query to get all championships`, queryString);
  try {
    let data = await db.query(queryString);
    const result = data.rows;
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
