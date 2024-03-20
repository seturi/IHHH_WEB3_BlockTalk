import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoImg from "../images/blocktalk_t.png"
import { Modals, Toast } from "../components/Components"
import { setMyName, setMyPublicKey, setMyProvider, setMyContract, setIsLoggedIn } from "../redux/states/Account";
import { setNamModal } from "../redux/states/Modals";
import { open, toastType } from "../redux/states/Toast";
import { ethers } from "ethers";
import { useContract } from "../ContractContext";

export const Login = ( ) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myContract = useContract();
    const toast = useSelector(state => state.toast.isOpen);
    const isLoggedIn = useSelector(state => state.account.isLoggedIn);
    const [load, setLoad] = useState(false);
    
    const openToast = (type, message) => {
        const payload = {
            type: type,
            message: message
        };

        dispatch(open(payload));
    };

    const connectToMetamask = async () => {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            return true;
        } catch (err) {
            return false;
        }
    };

    const login = async () => {
        let res = await connectToMetamask();

        if (!res) {
            openToast(toastType.FAIL, ("Couldn't connect to MetaMask"));
            return false;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        dispatch(setMyProvider({name: provider.name, chainId: provider.chainId}));
        const signer = provider.getSigner();
    
        try {
            const address = await signer.getAddress();
            let present = await myContract.checkUserExists(address);
            let name = "";
            
            if (present) name = await myContract.getUsername(address);
            else {
                dispatch(setNamModal(true));
                createAccount(name);
            }
            dispatch(setMyName(name));
            dispatch(setMyPublicKey(address));
            dispatch(setIsLoggedIn(true));
        } catch (err) {
            openToast(toastType.FAIL, "CONTRACT_ADDRESS not set properly!")
        }
        dispatch(setNamModal(false));
    };

    const createAccount = async (name) => {
        setLoad(true);

        try {
            const tx = await myContract.createAccount(name);
            await tx.wait();
            setLoad(false);
            openToast(toastType.SUCC, "Your name is set successfully");
        } catch (err) {
            openToast(toastType.FAIL, err.error?.message.substring(20) || "User denied transaction signature");
            setLoad(false);
        }
    };

    const handleLogin = async () => {
        await login();
        if (isLoggedIn) {
            navigate("/main");
        }
    };

    return (
        <div className="Login">
            <div className="Container" onClick={handleLogin}>
                <div className="Logo">
                    <img src={LogoImg} alt="blocktalk_t.png"></img>
                    <span>BLOCKTALK</span>
                </div>
                <span>Click to Login ...</span>
            </div>
            {toast && <Toast />}
            <Modals
                load={load}
                openToast={openToast}
                createAccount={createAccount}
            />
        </div>
    )
}