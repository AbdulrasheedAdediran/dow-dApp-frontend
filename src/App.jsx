import { React } from "react";
import "./App.css";
// import { useState } from "react";
import StartGame from "./components/container/StartGame/StartGame";
import HowToPlay from "./components/container/HowToPlay/HowToPlay";
import Options from "./components/container/Options/Options";
import About from "./components/container/About/About";
// import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./components/container/About/About"

const App = () => {
  // const [connectWallet, setConnectWallet] = useState(false);
  // const [startGame, setStartGame] = useState(false);
  // const [howToPlay, setHowToPlay] = useState(false);
  // const [options, setOptions] = useState(false);
  // const [about, setAbout] = useState(false);
  // const [walletConnected, setWalletConnected] = useState(false);

  // const handleWalletConnect = async () => {
  //   if (window.ethereum || window.web3) {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //   } else {
  //     alert(
  //       "Please Use a Web3 Enable Browser or Install Metamask Wallet Extension"
  //     );
  //   }
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/startGame" exact element={<StartGame />} />
        <Route path="/howToPlay" exact element={<HowToPlay />} />
        <Route path="/options" exact element={<Options />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
