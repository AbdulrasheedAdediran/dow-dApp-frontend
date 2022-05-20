import { React, useState } from "react";
import "./Navbar.css";
import Connected from "./Connected";
// import { ethers } from "ethers";

const Navbar = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const requestAccounts = async () => {
    if (window.ethereum || window.web3) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.log("Error Connecting");
      }
    } else {
      alert(
        "Please Use a Web3 Enable Browser or Install Metamask Wallet Extension"
      );
    }
  };
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts();

      // const provider = ethers.providers.Web3Provider(window.ethereum)
      // console.log(provider)
    }
  };

  return (
    <nav>
      <div>
        <a href="./">DOW</a>
      </div>

      <div>
        {connected ? (
          <Connected
            // dowBalance={dowBalance}
            // chainBalance={chainBalance}
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
