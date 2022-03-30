import React from "react";
import "./Navbar.css";

const Navbar = ({ handleConnectWallet }) => {
  return (
    <nav>
      <div>Logo</div>
      <div>Play Dead or Wounded</div>
      <button onClick={handleConnectWallet}>Explore</button>
    </nav>
  );
};

export default Navbar;
