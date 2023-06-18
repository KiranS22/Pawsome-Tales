require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json()); 
const PORT = process.env.PORT || 4000;


app.listen(PORT, (err) => {
  console.log(`app is listening on ${PORT}`);
  if (err) {
    console.log(err.message);
  }
});
