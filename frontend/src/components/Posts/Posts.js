import React from "react";
import "./../../Resources/CSS/posts.css";

const Posts = () => {
  return (
    <>
      <>
        <div className="card mb-3 social-media-post">
          <div className="card-body">
            <h5 className="card-title">Post Title</h5>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button type="button" className="btn btn-link text-primary">
                  <i className="fa fa-thumbs-up like-icon"></i> Like
                </button>
                <button type="button" className="btn btn-link text-primary">
                  <i className="fa fa-comment comment-icon"></i> Comment
                </button>
              </div>
              <small className="text-muted">Posted 2 hours ago</small>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Posts;
