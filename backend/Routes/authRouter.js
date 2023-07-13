const express = require("express");
const authRouter = express.Router();
const { queryDatabase, handleRouteLogic } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Not getting hit at all
authRouter.post("/register", async (req, res) => {
  console.log("register hit");

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      tel,
      address,
      city,
      postcode,
    } = req.body;

    // Check if user already exists
    const existingUser = await queryDatabase(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.length > 0) {
      handleRouteLogic(res, "Invalid", "User already exists", 403);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // Inserting user given information
    const newUser = await queryDatabase(
      "INSERT INTO users(first_name, last_name, email, password, phone_number, address, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [firstName, lastName, email, hash, tel, address, city, postcode]
    );

    if (newUser.length > 0) {
      // Generating a username
      const val = Math.floor(1000 + Math.random() * 9000).toString();
      const userName =
        newUser[0]["first_name"] + "-" + newUser[0]["last_name"] + val;
      // Inserting the username into the database
      const generatedUserName = await queryDatabase(
        "UPDATE users SET username = $1 WHERE email = $2 RETURNING *",
        [userName, email]
      );

      if (generatedUserName.length > 0) {
        handleRouteLogic(
          res,
          "Success",
          "User Registered and Username Created",
          200,
          generatedUserName[0]
        );
      } else {
        handleRouteLogic(res, "Error", "Could Not Generate Username", 403);
      }
    } else {
      handleRouteLogic(res, "Error", "Could Not Register User", 403);
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

    if (user[0].length > 0) {
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

authRouter.put("/update-profile", async (req, res) => {
  try {
    const { firstName, lastName, email, tel, address, city, postcode } =
      req.body;

    const updateProfile = await queryDatabase(
      "UPDATE users SET first_name = $1, last_name = $2,  phone_number = $3, address = $4, city=$5, postcode=$6 WHERE email = $7 RETURNING *",
      [firstName, lastName, tel, address, city, postcode, email]
    );
    if (updateProfile[0].length > 0) {
      handleRouteLogic(
        res,
        "Success",
        "Profile Updated Sucsessfully",
        200,
        updateProfile[0]
      );
    } else {
      handleRouteLogic(res, "Error", "Could Not Update Profile", 404);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 404);
  }
});
authRouter.get("/auth-user", (req, res) => {
  try {
    if (req.user) {
      handleRouteLogic(res, "Success", "User Authenticated Sucsessfully", 201, {
        user: req.user,
      });
    } else {
      handleRouteLogic(res, "Error", "User Is Not Logged In", 403);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
module.exports = authRouter;
