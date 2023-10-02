import React, { useState } from "react";
import "./../../Resources/CSS/postbar.css";
import { createPostAPICall } from "../../utils/utills";
import NewPostModal from "../CreatePostModal/NewPostModal";

const PostBar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = () => {
    setShowModal(true);
  };

  const addPostToFeed = async () => {
    // const status = response.status;
    // const post = response.data.data;
    const response = await createPostAPICall();
    console.log("response for creating a response in the component", response);
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

      {showModal && <NewPostModal setShowModal={setShowModal} />}
      
    </div>
  );
};

export default PostBar;
