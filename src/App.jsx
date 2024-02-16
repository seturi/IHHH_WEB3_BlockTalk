import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { abi } from "./abi";
import "./style.css"

// Add the contract address inside the quotes
const CONTRACT_ADDRESS = "0xa32a2ea6f3d0938132ebcb5cc9c9f3fe16da725e";

function App(props) {
  const [myName, setMyName] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const [myContract, setMyContract] = useState(null);

  // Save the contents of abi in a variable
  const contractABI = abi;
  let provider;
  let signer;

  // Login to MetaMask and check the if the user exists else creates one
  async function login() {
    let res = await connectToMetamask();
    if (res === true) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        setMyContract(contract);
        const address = await signer.getAddress();
        let present = await contract.checkUserExists(address);
        let username;
        if (present)
          username = await contract.getUsername(address);
        else {
          username = prompt('Enter a username', 'Guest');
          if (username === '') username = 'Guest';
          await contract.createAccount(username);
        }
        setMyName(username);
        setMyPublicKey(address);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly!");
      }
    } else {
      alert("Couldn't connect to MetaMask");
    }
  }

  // Check if the MetaMask connects 
  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    /* <Login login={async () => login()} />*/
    <Main />
  );
}

export default App