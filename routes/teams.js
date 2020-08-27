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
    `query to get tems in championship : ${championshipId}`,
    queryString
  );
  let data = await db.query(queryString);
  const result = data.rows;

  res.send(result);
});
// Get all Clients & experts basic informations
// router.get("/", async (req, res) => {
//   const result = { clients: null, experts: null };

//   let queryString = `SELECT id, first_name, last_name, email, company FROM clients;`;
//   console.log(queryString);
//   let data = await db.query(queryString);
//   result.clients = data.rows;

//   queryString = `SELECT id, first_name, last_name, email, availability FROM experts;`;
//   console.log(queryString);
//   data = await db.query(queryString);
//   result.experts = data.rows;

//   res.send(result);
// });

// // Get User infos & projects
// router.get("/client/:id", async (req, res) => {
//   const userId = req.params.id;
//   const result = { client: null, projects: null };

//   let queryString = `SELECT id, first_name, last_name, email, company FROM clients WHERE id = ${userId};`;
//   console.log(queryString);
//   let data = await db.query(queryString);
//   result.client = data.rows[0];

//   queryString = `SELECT * FROM projects WHERE client = ${userId};`;
//   console.log(queryString);
//   data = await db.query(queryString);
//   result.projects = data.rows;
//   let newProjectsArray = [];
//   if (result.projects) {
//     for (let i = 0; i < result.projects.length; i++) {
//       queryString = `SELECT * FROM projects_needs WHERE project = ${result.projects[i].id};`;
//       console.log(queryString);
//       data = await db.query(queryString);
//       const needs = data.rows;
//       let newNeedsArray = [];
//       if (needs) {
//         for (let j = 0; j < needs.length; j++) {
//           queryString = `SELECT needs_propositions.id, experts.first_name, experts.last_name, needs_propositions.reason, needs_propositions.step
//           FROM needs_propositions, experts
//           WHERE needs_propositions.expert = experts.id AND needs_propositions.project_need = ${needs[j].id};`;
//           console.log(queryString);
//           data = await db.query(queryString);
//           const needsPropositions = data.rows;
//           newNeedsArray.push({ ...needs[j], propositions: needsPropositions });
//         }
//       }
//       newProjectsArray.push({ ...result.projects[i], needs: newNeedsArray });
//     }
//   }

//   result.projects = newProjectsArray;

//   res.send(result);
// });

// // Create a new user
// router.post("/", async (req, res) => {
//   const newUserData = req.body;
//   const { error } = validateUser(newUserData);
//   if (error) return res.status(400).send(error.details[0].message);
//   let queryString = "";
//   if (newUserData.type === "Client") {
//     queryString = `INSERT INTO
//     clients (first_name, last_name, company, email, password, phone, international, country, note)
//     VALUES ('${newUserData.first_name}', '${newUserData.last_name}', '${newUserData.company}', '${newUserData.email}', crypt('${newUserData.password}', gen_salt('bf')), '${newUserData.phone}', '${newUserData.international}', '${newUserData.country}', '${newUserData.note}')
//     RETURNING id, first_name, last_name;`;
//   } else {
//     queryString = `INSERT INTO
//     experts (first_name, last_name, email, password, availability, phone, international, country, note)
//     VALUES ('${newUserData.first_name}', '${newUserData.last_name}', '${newUserData.email}', crypt('${newUserData.password}', gen_salt('bf')), ${newUserData.availability}, '${newUserData.phone}', '${newUserData.international}', '${newUserData.country}', '${newUserData.note}')
//     RETURNING id, first_name, last_name;`;
//   }
//   const result = await db.query(queryString);

//   res.send({ ...result.rows[0], type: newUserData.type });
// });

// // Login
// router.post("/login", async (req, res) => {
//   const user = req.body;
//   const { error } = validateLogIn(user);
//   if (error) return res.status(400).send(error.details[0].message);
//   const queryString = `SELECT first_name, last_name FROM clients
//   WHERE email = '${user.email}' AND password = crypt('${user.password}', password);`;
//   const data = await db.query(queryString);
//   if (data.rows) res.send(data.rows[0]);
//   else return res.status(400).send("Email or password incorrect ...");
// });

// // Validation fucntions
// function validateUser(user) {
//   const schemaClient = Joi.object({
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
//     company: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(3).required(),
//     phone: Joi.string().min(9).max(10).allow(""),
//     international: Joi.string().allow(""),
//     country: Joi.string().allow(""),
//     note: Joi.string().allow(""),
//   });

//   const schemaExpert = Joi.object({
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(3).required(),
//     availability: Joi.boolean().required(),
//     phone: Joi.string().min(9).max(10).allow(""),
//     international: Joi.string().allow(""),
//     country: Joi.string().allow(""),
//     note: Joi.string().allow(""),
//   });
//   if (user.type === "Client")
//     return schemaClient.validate({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       company: user.company,
//       email: user.email,
//       password: user.password,
//       phone: user.phone,
//       international: user.international,
//       country: user.country,
//       note: user.note,
//     });
//   else
//     return schemaExpert.validate({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       password: user.password,
//       availability: user.availability,
//       phone: user.phone,
//       international: user.international,
//       country: user.country,
//       note: user.note,
//     });
// }

// function validateLogIn(user) {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(3).required(),
//   });
//   return schema.validate(user);
// }
