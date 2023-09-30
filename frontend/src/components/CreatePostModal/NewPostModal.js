import React, { useState } from "react";

const NewPostModal = ({ setShowModal }) => {
  const [post, setPost] = useState({
    content: "",
    title: "",
  });
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
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
            <button type="button" className="close" onClick={handleCloseModal}>
              <span className="text-center" onClick={handleCloseModal}>
                &times;
              </span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Post Title..."
              className="form-control mb-3"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <textarea
              className="form-control"
              rows="5"
              placeholder="Write your post here..."
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            ></textarea>
          </div>
          <div className="modal-footer d-flex justify-content-between ">
            <div className="media-options d-flex justify-content-start align-items-end mt-3">
              <i className="fa-regular fa-image"></i>
              <i className="fa-sharp fa-regular fa-face-smile"></i>
            </div>
            <div className="d-flex jusstify-content-between">
              <button type="button" className="btn btn-primary btn-modal-post">
                Post
              </button>
              <button
                type="button"
                className="btn btn-dark btn-modal-cancel mx-4"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
