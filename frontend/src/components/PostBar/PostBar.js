import React, { useState } from "react";
import "./../../Resources/CSS/postbar.css";

const PostBar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container text-center post-bar-container d-flex justify-content-center mt-3 shadow flex-column">
      <input
        className="post-bar text-center mt-3 shadow"
        type="text"
        placeholder="Create a post"
        onClick={handleInputChange}
        readOnly
      />
      <div className="media-options d-flex justify-content-start align-items-end mt-3">
        <i className="fa-regular fa-image"></i>
        <i className="fa-sharp fa-regular fa-face-smile"></i>
      </div>

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create a Post</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span className="text-center">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your post here..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary btn-modal-post"
                >
                  Post
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-modal-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostBar;
