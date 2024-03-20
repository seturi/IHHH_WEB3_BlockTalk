import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from "./abi";

const CONTRACT_ADDRESS = "0x35bdfc8c7675c450721add735d04645f0eb332f2";
const contractABI = abi;
const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
	const [contract, setContract] = useState();
  
	useEffect(() => {
		const initContract = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
			setContract(contractInstance);
		};
	
		initContract();
	}, []);
  
	return (
		<ContractContext.Provider value={contract}>
			{children}
		</ContractContext.Provider>
	);
};
  
export const useContract = () => useContext(ContractContext);