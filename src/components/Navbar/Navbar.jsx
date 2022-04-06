import React from "react";
import "./Navbar.css";

const Navbar = ({ handleConnectWallet }) => {
  return (
    <nav>
      <div>Dead or Wounded Logo</div>
      <button onClick={handleConnectWallet}>Explore</button>
    </nav>
  );
};

export default Navbar;
