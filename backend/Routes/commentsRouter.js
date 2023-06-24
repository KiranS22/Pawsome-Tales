const express = require("express");
const commentsRouter = express.Router();
const { queryDatabase, handleRouteLogic } = require("../utils");

// GET all comments of a specific post
commentsRouter.get("/:postid/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const AllCommentsForPost = await queryDatabase(
      "SELECT * FROM comments WHERE post_id = $1",
      [postId]
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
try{
  const { postId } = req.params;
  const { commentBody } = req.body;
  const postExisits = await queryDatabase("SELECT FROM posts WHERE id = $1")
  if(postExisits === 0){
    handleRouteLogic(res, "Error",  "Could Not Find Post", 404)
  }
  

  const newCommentsForPost = await queryDatabase("");
}catch(e){

}


});
// UPDATE a specific comment by ID
commentsRouter.put("/:id", async (req, res) => {});
// DELETE a specific comment by ID
commentsRouter.delete("/", async (req, res) => {});

module.exports = commentsRouter;
