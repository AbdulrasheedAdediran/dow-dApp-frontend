import { React } from "react";
import "./Navbar.css";
import Connected from "./Connected";

const Navbar = ({
  connectWallet,
  connected,
  walletAddress,
  userBalance,
  string,
}) => {
  return (
    <nav>
      <div>
        <a href="./">DOW</a>
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
