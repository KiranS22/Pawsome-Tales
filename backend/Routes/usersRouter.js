const express = require("express");
const { queryDatabase, handleRouteLogic } = require("../utils");
const userRouter = express.Router();
userRouter.get("/", async (req, res) => {
  try {
    const allusers = await queryDatabase("SELECT * FROM users");
    if (allusers.length > 0) {
      handleRouteLogic(res, "Success", "Fetched All Users", 200, allusers);
    } else {
      handleRouteLogic(res, "Error", "Could Not Fetch Users", 404);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
userRouter.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const singleUser = queryDatabase("SELECT * FROM users WHERE id = $1", [
      Number(id),
    ]);
    if (singleUser.length > 0) {
      handleRouteLogic(
        res,
        "Success",
        `user ${id} fetched`,
        200,
        singleUser[0]
      );
    } else {
      handleRouteLogic(res, "Error", "User Not Found", 404);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
userRouter.put("/:id", async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      city,
      postcode,
    } = req.body;
    let { id } = req.params;
    const updatedUser = await queryDatabase(
      "UPDATE users SET first_name=$1, last_name = $2, email=$3,password=$4 , phone_number=$5, city=$6, postcode=$7 WHERE id =$8 RETURNING *",
      [
        first_name,
        last_name,
        email,
        password,
        phone_number,
        city,
        postcode,
        Number(id),
      ]
    );
    if (updatedUser.length > 0) {
      handleRouteLogic(
        res,
        "Success",
        `user ${id} has been updated`,
        200,
        updatedUser.rows[0]
      );
    } else {
      handleRouteLogic(res, "Error", "Unable to Update User", 403);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await handleRouteLogic("DELETE FROM users WHERE id = $1", [Number(id)]);

    handleRouteLogic(res, "Success", `user ${id} has been deleted`, 200);
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
module.exports = userRouter;
