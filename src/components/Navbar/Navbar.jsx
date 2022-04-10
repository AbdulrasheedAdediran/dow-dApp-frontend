import React from "react";
import "./Navbar.css";

const Navbar = ({ handleConnectWallet }) => {
  return (
    <nav>
      <div>DOW Logo</div>
      <button className="btn-explore" onClick={handleConnectWallet}>
        Explore
      </button>
    </nav>
  );
};

export default Navbar;
