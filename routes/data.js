const AuthService = require('../routes/services/auth');
const express = require('express');
const pool = require("../routes/services/db")
const dataRouter = express.Router();

dataRouter.put("/category", AuthService.verifyToken, async (req, res) => {
    try {
      const { category } = req.body;
      const result = await pool.query(
        "INSERT INTO animal_categories (category) VALUES($1) RETURNING *",
        [category]
      );
      //if required to know the logged in user and the expiry time
      //result.rows[0]["user"] = req.user;
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  dataRouter.get("/categories", AuthService.verifyToken, async (req, res) => {
    try {
      const categories = await pool.query("SELECT * FROM animal_categories");
      res.json(categories.rows);
    } catch (err) {
      console.error("Error in block-get all categories", err.message);
    }
  });
  
  dataRouter.get("/category/:id", AuthService.verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM animal_categories WHERE id = $1", [id]);
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  dataRouter.delete("/category/:id", AuthService.verifyToken, async (req, res) => {
    try {
      const  id = req.params.id;
      const result = await pool.query("DELETE FROM animal_categories WHERE id = $1", [id]);
      res.json({"DeleteRowCount":result.rowCount});
    } catch (err) {
      console.log(err.message);
    }
  });

  dataRouter.get("/photos/:id", AuthService.verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT photo_url FROM animal_photos WHERE category_id = $1", [id]);
        res.json(result.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  module.exports = dataRouter;