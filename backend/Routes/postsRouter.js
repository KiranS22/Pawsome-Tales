const express = require("express");
const postsRouter = express.Router();
const { queryDatabase, handleRouteLogic } = require("../utils");
// GET all posts (used to create news feed - without comments)
postsRouter.get("/", async (req, res) => {
  try {
    const allPosts = await queryDatabase("SELECT * FROM posts");
    if (allPosts.length > 0) {
      handleRouteLogic(
        res,
        "Success",
        "All Posts Fetched Sucessfully",
        200,
        allPosts
      );
    } else {
      handleRouteLogic(res, "Error", "Could not Fetch Posts", 403);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});

// GET  all posts with comments
postsRouter.get("/with-comments", async (req, res) => {
  try {
    const postsWithComments = await queryDatabase(
      "SELECT p.title AS POST_TITLE, p.content AS POST_CONTENT, p.likes AS POST_LIKES, p.image, p.authour  AS POST_AUTHOUR, c.body AS COMMENTBODY, c,authour AS COMMENT_AUTHOUR, c.likes AS COMMENT_LIKES from posts AS p INNER JOIN comments AS c ON(p.id = c.post_id) "
    );
    if (postsWithComments.length > 0) {
      handleRouteLogic(
        res,
        "Succsess",
        "Posts With Comments Fetched Successfully",
        200,
        postsWithComments[0]
      );
    } else {
      handleRouteLogic(
        res,
        "Error",
        "Could Not Fetch Posts With Comments",
        403
      );
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
postsRouter.post("/", async (req, res) => {
  const { email } = req.user;
  const { content, image, title } = req.body;

  try {
    const userName = await queryDatabase(
      "SELECT username FROM users WHERE email=$1",
      [email]
    );

    if (userName.length > 0) {
      const newPost = await queryDatabase(
        "INSERT INTO posts(content, authour, image, title) VALUES ($1, $2, $3, $4) RETURNING *",
        [content, userName[0].username, image, title]
      );

      console.log("After the newPost query", newPost);
      if (newPost.length > 0) {
        handleRouteLogic(
          res,
          "Success",
          "Post Added Successfully",
          200,
          newPost[0]
        );
      }
    } else {
      handleRouteLogic(res, "Error", "Could Not Add Post", 404);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});

postsRouter.put("/id", async (req, res) => {
  try {
    const { id } = req.params;
    const postToRemove = await queryDatabase("DELETE FROM posts WHERE id=$1", [
      Number(id),
    ]);
    if (postToRemove) {
      handleRouteLogic(res, "Success", "Post Deleted Sucessfully", 200);
    } else {
      handleRouteLogic(res, "Error", "Could Not Delete Post", 403);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
module.exports = postsRouter;
