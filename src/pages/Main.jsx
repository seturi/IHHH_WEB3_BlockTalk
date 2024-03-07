import { useState, useEffect, useRef } from "react";
import { utils } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, SideBar, Modals, Toast, ChatRoom } from "../components/Components"
import { setAddModal, setGenModal } from "../redux/states/Modals";
import { open, toastType } from "../redux/states/Toast";

export const Main = (props) => {
    const dispatch = useDispatch();
    const genModal = useSelector(state => state.modal.genModal);
    const toast = useSelector(state => state.toast.isOpen);
    const [load, setLoad] = useState(false);
    const codeRef = useRef({
        code: null,
        timeStamp: 0
    });
    const validTimeRef = useRef({
        time: 600,
        minute: "10",
        second: "00"
    });

    const generateCode = async () => {
        if (!codeRef.current.code) {
            try {
                const tx = await props.myContract.generateKeyString();
                const receipt = await tx.wait();
                const key = receipt.events[0].args.key;
                const code = utils.toUtf8String(key);
                codeRef.current.code = code;
                const blockNumber = await props.myProvider.getBlockNumber();
                const block = await props.myProvider.getBlock(blockNumber);
                const timeStamp = block.timestamp;
                codeRef.current.timeStamp = timeStamp;
                openToast(toastType.SUCC, "The code has generated");
            } catch (err) {
                dispatch(setAddModal(true));
                dispatch(setGenModal(false));
                openToast(toastType.FAIL, "User denied transation signature");
            }
        }
    };

    const addFriend = async (code) => {
        setLoad(true);

        try {
            await props.myContract.addFriendbyCode(code);
            setLoad(false);
            openToast(toastType.SUCC, "Friend added successfully")
        } catch (err) {
            openToast(toastType.FAIL, "Invalid code");
            setLoad(false);
        }
    };

    const openToast = (type, message) => {
        const payload = {
            type: type,
            message: message
        };

        dispatch(open(payload));
    };

    useEffect(() => {
        let requestId;

        const checkValidTime = () => {
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - codeRef.current.timeStamp;
            validTimeRef.current.time = 600 - elapsedTime;
            validTimeRef.current.minute = Math.floor(validTimeRef.current.time / 60).toString().padStart(2, "0");
            validTimeRef.current.second = (validTimeRef.current.time % 60).toString().padStart(2, "0");

            if (validTimeRef.current.time <= 0) {
                if (genModal) {
                    dispatch(setAddModal(true));
                    dispatch(setGenModal(false));
                }

                cancelAnimationFrame(requestId);
                codeRef.current.code = null;
                codeRef.current.timeStamp = 0;
                openToast(toastType.INFO, "The code has expired");
            } else {
                requestId = requestAnimationFrame(checkValidTime);
            }
        };

        if (codeRef.current.timeStamp) {
            requestId = requestAnimationFrame(checkValidTime);
        };

        return () => {
            cancelAnimationFrame(requestId);
        };
    });

    return (
        <div className="Main">
            <div className="Container">
                <NavBar name={props.name} address={props.address} />
                <div className="Contents">
                    <SideBar />
                    <ChatRoom name="name1" address="0x1" />
                </div>
                {toast && <Toast />}
            </div>
            <Modals
                codeRef={codeRef}
                validTimeRef={validTimeRef}
                generateCode={generateCode}
                addFriend={addFriend}
                load={load}
            />
        </div>
    )
}