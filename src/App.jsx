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
const DOWContract = "0x94105EecF6DB901e46a737d2c9a9b1a30e729f5E";
const App = () => {
  const [generatedValues, setGeneratedValues] = useState([]);
  const [connected, setConnected] = useState(false);
  const [userBalance, setUserBalance] = useState({
    DOWTokenBalance: 0,
    networkCoinBalance: 0,
  });
  // Handle player's statistics
  const [playerStatistics, setPlayerStatistics] = useState({
    gamesPlayed: 0,
    gamesLost: 0,
    currentWinStreak: 0,
    highestWinStreak: 0,
    gamesWon: 0,
  });
  // Requests wallet connection
  const requestAccounts = async () => {
    if (window.ethereum || window.web3) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } catch (error) {
        if (error.code === 40001) {
          alert("Please connect to Metamask");
        }
      }
    } else {
      alert("Please Use a Web3 Enable Browser or Install Metamask");
    }
  };
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts();
    }
  };
  // Eagerly connects user and fetches their account data
  const eagerConnect = async () => {
    connectWallet();
    const networkID = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (
      Number(networkID) !== Number(process.env.POLYGON_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.METER_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.BOBA_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.GODWOKEN_NETWORK_ID)
    )
      return;
    const provider = new ethers.providers.Web3Provider(window.ehereum);
    const accounts = provider.listAccounts();
    const userAccount = await getUserBalance(accounts[0]);
    if (!accounts.length) return;
    setUserBalance({
      networkCoinBalance: userAccount.networkCoinBalance,
      DOWTokenBalance: userAccount.DOWTokenBalance,
    });
    getPlayerStatistics();
    setConnected(true);
  };

  // Airdrop free DOW tokens to new players
  const claimFreeTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const DOWContractInstance = new Contract(DOWContract, DOW_ABI, signer);
    await DOWContractInstance.claimFreeTokens();
  };

  // Gets user chain balance and DOW token balance
  const getUserBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkCoinBalance = await provider.getBalance(address);
      const DOWContractInstance = new Contract(DOWContract, DOW_ABI, provider);
      const DOWTokenBalance = await DOWContractInstance.balanceOf(address);
      return { networkCoinBalance, DOWTokenBalance };
    } catch (error) {
      alert("Error getting user balance");
    }
  };
  // Get player's statistics
  const getPlayerStatistics = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereeum);
    const signer = new provider.getSigner();
    const DOWContractInstance = new Contract(DOWContract, DOW_ABI, signer);
    const playerStats = await DOWContractInstance.checkStreak();
    const played = playerStats.gamesPlayed;
    const won = playerStats.gamesWon;
    const lost = playerStats.gamesLost;
    const currentStreak = playerStats.currentWinStreak;
    const highestStreak = playerStats.maxWinStreak;

    setPlayerStatistics({
      gamesPlayed: played,
      gamesWon: won,
      gamesLost: lost,
      currentWinStreak: currentStreak,
      highestWinStreak: highestStreak,
    });
  };
  const handleStartGame = async () => {
    startGame();
  };
  // Start game
  const startGame = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new provider.getSigner();
    const DOWContractInstance = new Contract(DOWContract, DOW_ABI, signer);
    const startGame = await DOWContractInstance.startGame();
    const generatedValues = startGame.playerNumbers;
    // const randomNumbers = await DOWContractInstance.queryFilter(
    //   "PlayerNumbers"
    // );
    setGeneratedValues([generatedValues]);
  };
  // Check number of trials it took player to win and reward player
  const checkTrials = async (trial) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const DOWContractInstance = new Contract(DOWContract, DOW_ABI, signer);
    await DOWContractInstance.checkTrials(trial);
  };
  //Alerts user to switch to a supported network when account is switched from a supported network
  const handleAccountChanged = async (accounts) => {
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
      const userAccount = await getUserBalance(accounts[0]);

      setUserBalance({
        networkCoinBalance: userAccount.networkCoinBalance,
        DOWTokenBalance: userAccount.DOWTokenBalance,
      });
    } else {
      setConnected(false);
      setUserBalance({
        DOWTokenBalance: 0,
        networkCoinBalance: 0,
      });
    }
  };
  //Alerts user to switch to a supported network when account is switched from a supported network
  const handleChainChanged = async (networkID) => {
    if (
      Number(networkID) !== Number(process.env.POLYGON_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.METER_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.BOBA_NETWORK_ID) ||
      Number(networkID) !== Number(process.env.GODWOKEN_NETWORK_ID)
    ) {
      setConnected(false);
      setUserBalance({
        DOWTokenBalance: 0,
        networkCoinBalance: 0,
      });

      alert("Invalid network, please switch to a DOW supported network");
      return;
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (!accounts.length) return;
      const userAccount = await getUserBalance(accounts[0]);
      setUserBalance({
        networkCoinBalance: userAccount.networkCoinBalance,
        DOWTokenBalance: userAccount.DOWTokenBalance,
      });
      setConnected(true);
    }
  };
  const init = async () => {
    const customProvider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );
    const DOWContractInstance = new Contract(
      DOWContract,
      DOW_ABI,
      customProvider
    );
  };
  useEffect(() => {
    init();
    if (!window.ethereum) return;

    window.ethereum.on("connect", eagerConnect);
    window.ethereum.on("accountChange", handleAccountChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    // window.removeListener("connect", eagerConnect);
    // window.removeListener("accountChange", handleAccountChanged);
    // window.removeListener("chainChanged", handleChainChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/layout" exact element={<Navbar />} />
        <Route
          path="/"
          exact
          element={
            <Main
              eagerConnect={eagerConnect}
              connected={connected}
              handleStartGame={handleStartGame}
            />
          }
        />
        <Route
          path="/startGame"
          exact
          element={
            <StartGame
              generatedValues={generatedValues}
              connected={connected}
              handleStartGame={handleStartGame}
              userBalance={userBalance}
              setUserBalance={setUserBalance}
              playerStatistics={playerStatistics}
              setPlayerStatistics={setPlayerStatistics}
              connectWallet={connectWallet}
              eagerConnect={eagerConnect}
              startGame={startGame}
            />
          }
        />
        <Route path="/howToPlay" exact element={<HowToPlay />} />
        <Route path="/options" exact element={<Options />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
