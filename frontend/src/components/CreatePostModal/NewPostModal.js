import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";


const NewPostModal = ({ setShowModal }) => {
  const [post, setPost] = useState({
    content: "",
    title: "",
  });

  const [emojiKeyboard, setEmojiKeyboard] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onEmojiClick = (emoji) => {
    setPost((prevPost) => ({
      ...prevPost,
      content: prevPost.content + emoji.emoji,
    }));
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div
        className="modal-dialog modal-fullscreen-sm-down w-100"
        role="document"
      >
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
              className="form-control mb-3 mb-sm-0"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />

            <textarea
              className="form-control"
              rows="5"
              placeholder="Write your post here..."
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
          </div>
          <div className="modal-footer d-flex justify-content-between ">
            <div className="media-options d-flex justify-content-start align-items-end mt-3">
              <button className="btn btn-transparent">
                {" "}
                <i className="fa-regular fa-image"></i>
              </button>

              <button
                className="btn btn-transparent"
                onClick={() =>
                  setEmojiKeyboard((prevEmojiKeyboard) => !prevEmojiKeyboard)
                }
              >
                <i className="fa-sharp fa-regular fa-face-smile"></i>
              </button>
              <div
                className={
                  emojiKeyboard ? "d-block emoji-picker-container" : "d-none"
                }
              >
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
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
