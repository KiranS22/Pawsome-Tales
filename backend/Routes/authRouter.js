const express = require("express");
const authRouter = express.Router();
const { queryDatabase, handleRouteLogic } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
// Inserting user given information
    const newUser = await queryDatabase(
      "INSERT INTO users(first_name, last_name, email, password, phone_number, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [first_name, last_name, email, hash, phone_number, city, postcode]
    );

    if (newUser.length > 0) {
      // generating a username
      const val = Math.floor(1000 + Math.random() * 9000).toString();
      const userName =
        newUser[0]["first_name"] + "-" + newUser[0]["last_name"] + val;
// inserting that username into the database
      await queryDatabase(
        "UPDATE users SET username = $1 WHERE email = $2",
        [userName, email]
      );

      handleRouteLogic(res, "Success", "User Registered", 200, newUser[0]);
    } else {
      handleRouteLogic(res, "Error", "Could Not Generate Username", 403);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await queryDatabase("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.length > 0) {
      const founduser = user[0];
      if (founduser.password) {
        let validPass = await bcrypt.compare(password, founduser.password);

        if (validPass) {
          const token = jwt.sign(
            { email: founduser.email },
            process.env.SECRET
          );
          handleRouteLogic(res, "Success", "User Logged In", 200, token);
        } else {
          handleRouteLogic(res, "Error", "User Credentials Not Valid", 403);
        }
      } else {
        handleRouteLogic(res, "Error", "User Password Not Found", 500);
      }
    } else {
      handleRouteLogic(res, "Error", "User Not Found", 404);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 500);
  }
});

module.exports = authRouter;
