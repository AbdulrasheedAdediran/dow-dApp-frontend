import React from "react";
import "./App.css";
import { useState } from "react";
import { StartGame } from "./components/container/StartGame/StartGame";
import { HowToPlay } from "./components/container/HowToPlay/HowToPlay";
import { Options } from "./components/container/Options/Options";
import { About } from "./components/container/About/About";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Layout from "./components/Layout";

const App = ({ Component, pageProps }) => {
  const [connectWallet, setConnectWallet] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [howToPlay, setHowToPlay] = useState(false);
  const [options, setOptions] = useState(false);
  const [about, setAbout] = useState(false);

  const handleConnectWallet = () => {
    setConnectWallet(!connectWallet);
    console.log(connectWallet);
  };
  const handleStart = () => {
    setStartGame(!startGame);
    console.log(startGame);
  };
  const handleHowToPlay = () => {
    setHowToPlay(!howToPlay);
    console.log(howToPlay);
  };
  const handleOptions = () => {
    setOptions(!options);
    console.log(options);
  };
  const handleAbout = () => {
    setAbout(!about);
    console.log(about);
  };
  return (
    <div>
      {/* <Navbar handleConnectWallet={handleConnectWallet} />
      <Main
        handleStart={handleStart}
        handleHowToPlay={handleHowToPlay}
        handleOptions={handleOptions}
        handleAbout={handleAbout}
      /> */}
      <Main />
    </div>
  );
};

export default App;
