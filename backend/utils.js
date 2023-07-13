const jwt = require("jsonwebtoken");
const pool = require("./db");
const handleRouteLogic = (res, state, message, status, data = null) => {
  return res.status(status).send({
    data,
    state,
    message,
  });
};

const queryDatabase = async (queryString, parameters) => {
  try {
    const result = await pool.query(queryString, parameters);
    return result.rows;
  } catch (error) {
 
  }
};
const isUserLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // extracting the token from the auth header
    if (token) {
      let plainToken = token.slice(7); // removing the 'Bearer ' keyword

      const { email } = jwt.verify(plainToken, process.env.SECRET);
      const user = await queryDatabase("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.length > 0) {
        req.user = user[0];
        next(); // pass control to the next middleware function
      } else {
        handleRouteLogic(res, "Error", "User Not Found", 404);
      }
    } else {
      handleRouteLogic(res, "Error", "Not authorized", 401);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", "Could not handle request", e.message, 401);
  }
};

module.exports = { handleRouteLogic, queryDatabase, isUserLoggedIn };
