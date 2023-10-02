import React, { useState, useRef } from "react";
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


  const textareaRef = useRef(null);

  const onEmojiClick = (emoji) => {
    // Get the current cursor position in the textarea
    const cursorPosition = textareaRef.current.selectionStart;

    // Insert the emoji at the cursor position
    
    // Bug here as text  is replaced with text as apposed to being placed next to the prexisting text

    const newContent =
      post.content.slice(0, cursorPosition) +
      emoji.emoji +
      post.content.slice(cursorPosition);

    // Update the content state with the new text including the emoji
    setPost({ ...post, content: newContent });
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
              ref={textareaRef} // Ref to the textarea element
            ></textarea>
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
              <div className={emojiKeyboard ? "d-block" : "d-none"}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
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
