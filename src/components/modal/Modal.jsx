import React from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate, BrowserRouter } from "react-router-dom";

const Modal = ({ setIsOpen, message, numbers }) => {
  const navigate = useNavigate();
  return (
    <BrowserRouter>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{numbers}</h5>
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
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button
                className="cancelBtn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Modal;
