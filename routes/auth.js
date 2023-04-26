const express = require('express');
const pool = require("../routes/services/db")
const AuthService = require('./services/auth');
var bcrypt = require("bcryptjs");
const router = express.Router();

/* Get an auth token */
router.post('/signin', async (req, res) => {
  console.log(req.body);
  const email = req.body.username;
  const user_password = req.body.password;
  const token = AuthService.getToken(email);
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    console.log(user.rowCount, email);
    if(user.rowCount > 0 && bcrypt.compareSync( user_password, user.rows[0].user_password )) { 
      res.json({"access_token":token});}
    else {
      res.json({"error":"Username or Password or Email given is invalid!"})}
  
  } catch (err) {
    console.error(err.message);
  };
  });

router.post("/signup", async (req, res) => {
  try {
    const { email, user_password } = req.body;
    const password_encrypted = bcrypt.hashSync(user_password, 8);
    const result = await pool.query(
      "INSERT INTO users (username, email, user_password) VALUES($1, $2, $3) RETURNING *",
      [email, email, password_encrypted ]
    );

    res.json(result.rowCount);
  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;
