import React from "react";
import "./Navbar.css";

const Navbar = ({ handleConnectWallet }) => {
  return (
    <nav>
      <div>DOW Logo</div>
      <button className="btn-connect-wallet" onClick={handleConnectWallet}>
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
