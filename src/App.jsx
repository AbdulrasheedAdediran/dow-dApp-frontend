import { React, useState, useEffect } from "react";
import "./App.css";
// import { useState } from "react";
import StartGame from "./components/container/StartGame/StartGame";
import HowToPlay from "./components/container/HowToPlay/HowToPlay";
import Options from "./components/container/Options/Options";
import About from "./components/container/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { ethers, utils, Contract } from "ethers";
import DOW_ABI from "./util/DOW_ABI.json";
const DOWContractAddress = "0x94105EecF6DB901e46a737d2c9a9b1a30e729f5E";
const DOWBalance = DOWContractAddress.balanceOf("");
const chainBalance = DOWContractAddress.balanceOf("");
const App = () => {
  const [connected, setConnected] = useState(false);
  const [userDetails, setUserDetails] = useState({
    DOWTokenBalance: 0,
    networkCoinBalance: 0,
  });
  // Eagerly connects user and fetches their account data
  const eagerConnect = async () => {
    if (window.ethereum || window.web3) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      alert(
        "Please Use a Web3 Enabled Browser or Install Metamask Wallet Extension"
      );
    }
  };

  // Gets user chain balance and DOW token balance
  const getUserAccount = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkCoinBalance = await provider.getBalance(address);
      const DOWContractInstance = new Contract(
        DOWContractAddress,
        DOW_ABI,
        provider
      );
      const DOWTokenBalance = await DOWContractInstance.balanceOf(address);
      return { networkCoinBalance, DOWTokenBalance };
    } catch (error) {
      alert("Error getting user balance");
    }
  };
  //Alerts user to switch to a supported network when account is switched from a supported network
  const handleAccountSwitch = async (accounts) => {
    if (accounts.length) {
      const networkID = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (
        Number(networkID) === Number(process.env.POLYGON_NETWORK_ID) ||
        Number(networkID) === Number(process.env.METER_NETWORK_ID) ||
        Number(networkID) === Number(process.env.BOBA_NETWORK_ID) ||
        Number(networkID) === Number(process.env.GODWOKEN_NETWORK_ID)
      )
        return;
      const userAccount = await getUserAccount(accounts[0]);

      setUserDetails({
        DOWTokenBalance: userAccount.networkCoinBalance,
        networkCoinBalance: userAccount.DOWTokenBalance,
      });
    } else {
      setConnected(false);
      setUserDetails({
        DOWTokenBalance: 0,
        networkCoinBalance: 0,
      });
    }
  };
  //Alerts user to switch to a supported network when account is switched from a supported network
  const handleChainSwitch = async (networkID) => {
    if (
      Number(networkID) !== Number(process.env.POLYGON_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.METER_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.BOBA_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.GODWOKEN_NETWORK_ID)
    ) {
      setConnected(false);
      setUserDetails({
        DOWTokenBalance: 0,
        networkCoinBalance: 0,
      });

      alert("Invalid network, please switch to a DOW supported network");
      return;
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (!accounts.length) return;
      const userAccount = await getUserAccount(accounts[0]);
      setUserDetails({
        DOWTokenBalance: userAccount.networkCoinBalance,
        networkCoinBalance: userAccount.DOWTokenBalance,
      });
      setConnected(true);
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/layout" exact element={<Navbar />} />
          <Route path="/" exact element={<Main />} />
          <Route path="/startGame" exact element={<StartGame />} />
          <Route path="/howToPlay" exact element={<HowToPlay />} />
          <Route path="/options" exact element={<Options />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </BrowserRouter>
    );
  };
};
export default App;
