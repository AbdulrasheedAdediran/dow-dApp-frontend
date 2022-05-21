import { React, useState, useEffect } from "react";
import { ethers, utils, Contract } from "ethers";
import "./Navbar.css";
import Connected from "./Connected";
import DOW_ABI from "../../util/DOW_ABI.json";
const DOWContract = "0x375ce330dE9dcA06cFBA5677C425f318A6BcC62c";

const Navbar = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [userBalance, setUserBalance] = useState({
    DOWTokenBalance: 0,
    networkCoinBalance: 0,
  });
  //----------------//
  //==Connect Wallet==//
  //----------------//
  // Requests wallet connection
  const connectWallet = async () => {
    if (window.ethereum || window.web3) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setConnected(true);
        getUserBalance(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please Use a Web3 Enable Browser or Install Metamask");
    }
  };

  //----------------//
  //==Get Balance==//
  //----------------//

  // Gets user chain balance and DOW token balance
  const getUserBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const DOWContractInstance = new Contract(DOWContract, DOW_ABI, provider);
      const DOWTokenBalance = await DOWContractInstance.balanceOf(address);
      const networkCoinBalance = await provider.getBalance(address);
      const formartedNetworkCoinBalance = utils.formatUnits(
        networkCoinBalance,
        18
      );
      const formartedDOWTokenBalance = utils.formatUnits(DOWTokenBalance, 18);
      setUserBalance({
        DOWTokenBalance: formartedDOWTokenBalance,
        networkCoinBalance: formartedNetworkCoinBalance,
      });
      return { formartedNetworkCoinBalance, formartedDOWTokenBalance };
    } catch (error) {
      console.error(error);
      console.log("Error getting user balance");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);
  //======================//
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
