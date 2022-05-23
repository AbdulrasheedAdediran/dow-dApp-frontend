import { React } from "react";
import "./Navbar.css";
import Connected from "./Connected";

const Navbar = ({ connectWallet, connected, walletAddress, userBalance }) => {
  return (
    <nav>
      <div>
        <a href="./">
          <img src="/assets/dowLogo.png" alt="" />
        </a>
      </div>

      <div>
        {connected ? (
          <Connected
            DOWTokenBalance={userBalance.DOWTokenBalance}
            networkCoinBalance={userBalance.networkCoinBalance}
            address={walletAddress}
          />
        ) : (
          <button className="btn-connect-wallet" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
