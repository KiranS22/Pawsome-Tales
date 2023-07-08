import React from "react";
import "./../../Resources/CSS/postbar.css";

const PostBar = () => {
  return (
    <div className="container text-center post-bar-container d-flex justify-content-center mt-3 shadow">
      <input
        className="post-bar text-center mt-3 shadow"
        type="text"
        placeholder="Create a post"
      />
    </div>
  );
};

export default PostBar;
