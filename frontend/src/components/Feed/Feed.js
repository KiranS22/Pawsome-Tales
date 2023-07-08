import React from "react";
import PostBar from "../PostBar/PostBar";
import Posts from "../Posts/Posts";
import "./../../Resources/CSS/feed.css"

const Feed = () => {
  return (
    <div className="d-flex flex-column  justify-content-evenly container feed-container">
      <PostBar />

      <Posts />
    </div>
  );
};

export default Feed;
