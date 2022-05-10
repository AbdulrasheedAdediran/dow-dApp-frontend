import React from "react";
import "./App.css";
import { useState } from "react";
import StartGame from "./components/container/StartGame/StartGame";
import HowToPlay from "./components/container/HowToPlay/HowToPlay";
import Options from "./components/container/Options/Options";
import About from "./components/container/About/About";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import About from "./components/container/About/About"

const App = ({ Component, pageProps }) => {
  const [connectWallet, setConnectWallet] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [howToPlay, setHowToPlay] = useState(false);
  const [options, setOptions] = useState(false);
  const [about, setAbout] = useState(false);

  const handleConnectWallet = () => {
    setConnectWallet(!connectWallet);
    // console.log(connectWallet);
  };
  const handleStart = () => {
    setStartGame(!startGame);
    // console.log(startGame);
  };
  const handleHowToPlay = () => {
    setHowToPlay(!howToPlay);
    // console.log(howToPlay);
  };
  const handleOptions = () => {
    setOptions(!options);
    // console.log(options);
  };
  const handleAbout = () => {
    setAbout(!about);
    // console.log(about);
  };
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

    // <Main/>
    // <BrowserRouter>
    /* <Navbar handleConnectWallet={handleConnectWallet} />
      <Main
        handleStart={handleStart}
        handleHowToPlay={handleHowToPlay}
        handleOptions={handleOptions}
        handleAbout={handleAbout}
      /> */
    // <Route  element={<Main/>}
  );
};

export default App;
