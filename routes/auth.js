const express = require('express');
const pool = require("../routes/services/db")
const AuthService = require('./services/auth');
var bcrypt = require("bcryptjs");
const router = express.Router();

/* Get an auth token */
router.post('/signin', async (req, res) => {
  const email = req.body.emailid;
  const user_password = req.body.password;
  const token = AuthService.getToken(email);
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    //console.log(user.rowCount, email);
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
    const { username, emailid, password } = req.body;
    const password_encrypted = bcrypt.hashSync(password, 8);
    const result = await pool.query(
      "INSERT INTO users (username, email, user_password) VALUES($1, $2, $3) RETURNING *",
      [username, emailid, password_encrypted ]
    );
    res.json({"rowCount":result.rowCount, "msg":""});
  } catch (err) {
    console.error(err.message);
    if (err.message.includes('duplicate key value violates unique constraint') ){
      res.json({"rowCount":0, "msg":'Email already exists!'});
    } else {
    res.json({"rowCount":0, "msg":'Error while creating new user in database!'});}
  }
});


module.exports = router;
