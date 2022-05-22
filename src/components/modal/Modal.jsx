import React from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, message, actionOnYes }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading"></h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            {message}
            <br></br>
            <br></br>
            Play Again?
          </div>

          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="deleteBtn"
                onClick={() => {
                  window.open("https://deadorwounded.netlify.app", "_self");
                  setIsOpen(false);
                }}
              >
                Yes
              </button>
              <button
                className="cancelBtn"
                onClick={() => {
                  setIsOpen(false);
                  window.location.replace(
                    "https://deadorwounded.netlify.app",
                    "_self"
                  );
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
