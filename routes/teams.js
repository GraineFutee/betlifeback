const Router = require("express-promise-router");
const Joi = require("joi");
const db = require("../db");

const router = new Router();

module.exports = router;

// Request functions

// Get Teams in a championship
router.get("/championship/:id", async (req, res) => {
  const championshipId = req.params.id;
  let queryString = `SELECT t.id, t.name 
  FROM teams t, season_teams st, seasons s 
  WHERE t.id = st.team AND st.season = s.id AND s.championship = ${championshipId};`;
  console.log(
    `query to get teams in championship : ${championshipId}`,
    queryString
  );
  try {
    let data = await db.query(queryString);
    const result = data.rows;
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
