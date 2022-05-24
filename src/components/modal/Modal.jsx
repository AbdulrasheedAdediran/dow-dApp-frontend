import React from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DOW_ABI from "../../util/DOW_ABI.json";
import { Contract } from "ethers";

const Modal = ({ setIsOpen, message, provider, DOWContract, numbers }) => {
  const playAgain = async (e) => {
    e.preventDefault();
    console.log("Reloading...");
    window.setTimeout(() => {
      window.location.reload();
    }, [300]);
    console.log("Reloaded, Now Restarting game...");
    const accounts = await provider.listAccounts();
    const signer = provider.getSigner(accounts[0]);
    const DOWContractInstance = new Contract(DOWContract, DOW_ABI, signer);
    await DOWContractInstance.startGame();
  };

  const navigate = useNavigate();
  return (
    <>
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
              <button className="deleteBtn" onClick={playAgain}>
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
    </>
  );
};

export default Modal;
