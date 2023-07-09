import React, { useState } from "react";
import PostBar from "../PostBar/PostBar";
import Posts from "../Posts/Posts";
import "./../../Resources/CSS/feed.css";

const Feed = () => {
  const [showModal, setShowModal] = useState(false);

  const handleInputClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="form-header container d-flex justify-content-between  mt-4">
        <h1 className="font-weight-bold">YOUR FEED</h1>
        <i className="fa-solid fa-paw font-weight-bold mt-2"></i>
      </div>
      <div className="d-flex flex-column  justify-content-evenly container feed-container">
        <PostBar onClick={handleInputClick} />

        <Posts />
      </div>
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <textarea placeholder="Write a post"></textarea>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
