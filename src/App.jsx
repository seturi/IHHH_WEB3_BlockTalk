import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ethers } from "ethers";
import { Login, Main } from "./pages/Pages";
import { abi } from "./abi";
import "./style.css"

// TODO: 로그인 페이지 내에서 컨트랙트 배포
const CONTRACT_ADDRESS = "0x35bdfc8c7675c450721add735d04645f0eb332f2";

const App = (props) => {
  const [myName, setMyName] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const [myProvider, setMyProvider] = useState(null);
  const [myContract, setMyContract] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const contractABI = abi;
  let provider;
  let signer;

  async function login() {
    let res = await connectToMetamask();

    if (res === true) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      setMyProvider(provider);
      signer = provider.getSigner();
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        setMyContract(contract);
        const address = await signer.getAddress();
        let present = await contract.checkUserExists(address);
        let name;
        if (present) name = await contract.getUsername(address);
        else {
          name = prompt("Enter your name", "Guest");
          if (name === "") name = "Guest";
          await contract.createAccount(name);
        }
        setMyName(name);
        setMyPublicKey(address);
        setIsLoggedIn(true);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly!");
      }
    } else {
      alert("Couldn't connect to MetaMask");
    }
    return isLoggedIn;
  }

  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={isLoggedIn ? <Navigate to="/main" />
            : <Login login={async () => login()} />} />
        <Route path="/main"
          element={isLoggedIn ? <Main name={myName} address={myPublicKey} myProvider={myProvider} myContract={myContract} />
            : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App