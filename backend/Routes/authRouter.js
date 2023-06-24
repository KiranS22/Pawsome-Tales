const express = require("express");
const authRouter = express.Router();
const { queryDatabase, handleRouteLogic } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// HashSync - syncronus
// Hash - is async so requires await keyword
authRouter.post("/register", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      city,
      postcode,
    } = req.body;

    // Check if user already exists
    const existingUser = await queryDatabase(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.length > 0) {
      handleRouteLogic(res, "Error", "User already exists", 403);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await queryDatabase(
      "INSERT INTO users(first_name, last_name, email, password, phone_number, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [first_name, last_name, email, hash, phone_number, city, postcode]
    );

    if (newUser.length > 0) {
      handleRouteLogic(res, "Success", "User Registered", 200, newUser[0]);
    } else {
      handleRouteLogic(res, "Error", "Could Not Register User", 403);
    }
  } catch (e) {
    console.log("error", e.message);
    handleRouteLogic(res, "Error", e.message, 403);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const foundUser = req.user;

    const validPass = await bcrypt.compare(password, foundUser.password);
    if (validPass) {
      const token = jwt.sign({ email: foundUser.email }, process.env.SECRET);


      handleRouteLogic(res, "Success", "User Logged In", 200, token);
    } else {
      handleRouteLogic(res, "Error", "User with these credentials not found");
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});

module.exports = authRouter;
