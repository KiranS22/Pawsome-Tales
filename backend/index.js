require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const authRouter = require("./Routes/authRouter");
const postsRouter = require("./Routes/postsRouter");
const commentsRouter = require("./Routes/commentsRouter");
const userRouter = require("./Routes/usersRouter");
const PORT = process.env.PORT || 4000;
const { isUserLoggedIn } = require("./utils");

app.use("/auth", authRouter);
app.use("/posts", isUserLoggedIn, postsRouter);
app.use("/comments", isUserLoggedIn, commentsRouter);
app.use("/users", isUserLoggedIn, userRouter);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

app.listen(PORT, (err) => {
  console.log(`app is listening on ${PORT}`);
  if (err) {
    console.log(err.message);
  }
});
