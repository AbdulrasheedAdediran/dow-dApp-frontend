import { React, useState, useEffect } from "react";
import "./Navbar.css";
import Connected from "./Connected";
import { ethers, Contract } from "ethers";
import DOW_ABI from "../../util/DOW_ABI.json";
const DOWContract = "0x375ce330dE9dcA06cFBA5677C425f318A6BcC62c";

const Navbar = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [generatedValues, setGeneratedValues] = useState([]);
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
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts[0]);
        setConnected(true);
        setWalletAddress(accounts[0]);
      } catch (error) {
        if (error.code === 4001) {
          alert("Please connect to Metamask");
        }
      }
    }
  };
  const connectWallet = async () => {
    if (window.ethereum) {
      await requestAccounts();
      eagerConnect();
    } else {
      alert("Please Use a Web3 Enable Browser or Install Metamask");
    }
  };
  // Eagerly connects user and fetches their account data
  const eagerConnect = async () => {
    const networkID = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (Number(networkID) === 28) return;
    const provider = new ethers.providers.Web3Provider(window.ehereum);
    const accounts = provider.listAccounts();
    const userAccount = await getUserBalance(accounts[0]);
    if (!accounts.length) return;
    setUserBalance({
      networkCoinBalance: userAccount.networkCoinBalance,
      DOWTokenBalance: userAccount.DOWTokenBalance,
    });
    setConnected(true);
  };

  // Gets user chain balance and DOW token balance
  const getUserBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkCoinBalance = await provider.getBalance(address);
      const DOWContractInstance = new Contract(DOWContract, DOW_ABI, provider);
      const DOWTokenBalance = await DOWContractInstance.balanceOf(address);
      console.log("Network coin balance:", networkCoinBalance);
      return { networkCoinBalance, DOWTokenBalance };
    } catch (error) {
      console.error(error);
      // alert("Error getting user balance");
    }
  };

  //Alerts user to switch to a supported network when account is switched from a supported network
  const handleAccountChanged = async (accounts) => {
    if (accounts.length) {
      const networkID = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (Number(networkID) === 28) return;
      const userAccount = await getUserBalance(accounts[0]);
      console.log("Handle account change working");

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
    if (Number(networkID) !== 28) {
      setConnected(false);
      setUserBalance({
        DOWTokenBalance: 0,
        networkCoinBalance: 0,
      });
      console.log("Handle chain change working");
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
    // init();
    if (!window.ethereum) return;
    console.log("Use Effect Read");

    window.ethereum.on("connect", eagerConnect);
    window.ethereum.on("connect", connectWallet);
    window.ethereum.on("connect", getUserBalance);
    window.ethereum.on("accountChange", handleAccountChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    // window.removeListener("connect", eagerConnect);
    // window.removeListener("accountChange", handleAccountChanged);
    // window.removeListener("chainChanged", handleChainChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
