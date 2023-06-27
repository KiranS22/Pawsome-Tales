const express = require("express");
const commentsRouter = express.Router();
const { queryDatabase, handleRouteLogic } = require("../utils");

// GET all comments of a specific post
commentsRouter.get("/:postid/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const AllCommentsForPost = await queryDatabase(
      "SELECT * FROM comments WHERE post_id = $1",
      [Number(postId)]
    );
    if (AllCommentsForPost > 0) {
      handleRouteLogic(
        res,
        "Success",
        "Fetched All Comments",
        200,
        AllCommentsForPost
      );
    } else {
      handleRouteLogic(res, "Error", "Could Not Fetch comments", 404);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
// POST - (create) a comment for a specific post
commentsRouter.post("/:postid/", async (req, res) => {
  try {
    const { postId } = req.params;
    const { email } = req.user;
    const { commentBody } = req.body;
    const postExisits = await queryDatabase("SELECT FROM posts WHERE id = $1", [
      Number(postId),
    ]);
    if (postExisits === 0) {
      handleRouteLogic(res, "Error", "Could Not Find Post", 404);
    }
    const userName = await queryDatabase(
      "SELECT username FROM users WHERE email=$1",
      [email]
    );
    if (userName.length > 0) {
      const newCommentsForPost = await queryDatabase(
        "INSERT INTO comments(body, authour) VALUES ($1, $2) RETURNING*",
        [commentBody, userName]
      );
      if (newCommentsForPost.length > 0) {
        handleRouteLogic(
          res,
          "Success",
          "Comment Added Successfully",
          200,
          newCommentsForPost[0]
        );
      } else {
        handleRouteLogic(res, "Error", "Could Not Add Comment", 403);
      }
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});
// UPDATE a specific comment by ID
commentsRouter.put("/:id", async (req, res) => {
  const { commentBody } = req.body;
  const { id } = req.params;

  const updatedComment = await queryDatabase(
    "UPDATE comments SET(body=$1) WHERE id = $2 RETURNING *",
    [commentBody, Number(id)]
  );
  if (updatedComment.length > 0) {
    handleRouteLogic(
      res,
      "Success",
      "Comment Updated Successfully",
      200,
      updatedComment[0]
    );
  } else {
    handleRouteLogic(res, "Error", "Could Not Update Comment", 403);
  }
});
// DELETE a specific comment by ID
commentsRouter.delete("/id", async (req, res) => {
  try {
    const { id } = req.params;
    const commentToRemove = await handleRouteLogic(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      [Number(id)]
    );
    if (commentToRemove) {
      handleRouteLogic(res, "Success", "Comment Deleted Sucessfully", 200);
    } else {
      handleRouteLogic(res, "Error", "Could Not Delete Comment", 200);
    }
  } catch (e) {
    handleRouteLogic(res, "Error", e.message, 403);
  }
});

module.exports = commentsRouter;
