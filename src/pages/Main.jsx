import { useState, useRef, useEffect } from "react";
import { utils } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, SideBar, Modals, Toast, ChatRoom } from "../components/Components"
import { setAddModal, setGenModal } from "../redux/states/Modals";
import { open, toastType } from "../redux/states/Toast";

export const Main = (props) => {
    const dispatch = useDispatch();
    const index = useSelector(state => state.chat.index);
    const genModal = useSelector(state => state.modal.genModal);
    const toast = useSelector(state => state.toast.isOpen);
    const [friends, setFriends] = useState([]);
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
                openToast(toastType.FAIL, err.error?.message.substring(20) || "User denied transation signature");
                console.error(err);
            }
        }
    };

    const addFriend = async (code) => {
        setLoad(true);

        try {
            const tx = await props.myContract.addFriendbyCode(code);
            await tx.wait();
            setLoad(false);
            openToast(toastType.SUCC, "Friend added successfully")
        } catch (err) {
            openToast(toastType.FAIL, err.error?.message.substring(20) || "User denied transation signature");
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

    const deselect = () => {
        const selection = window.getSelection();

        if (selection) {
            selection.removeAllRanges();
        }
    };

    useEffect(() => {
        async function loadFriends() {
            let friendList = [];

            try {
                const data = await props.myContract.getMyFriendList();
                data.forEach((item) => {
                    friendList.push({ "publicKey": item[0], "name": item[1] });
                })
            } catch (err) {
                friendList = null;
            }
            setFriends(friendList);
        };

        loadFriends();
    }, [props.myProvider, props.myContract]);

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
        <div className="Main" onMouseDown={deselect}>
            <div className="Container">
                <NavBar
                    name={props.name}
                    address={props.address}
                    openToast={openToast}
                />
                <div className="Contents">
                    <SideBar friends={friends} />
                    <ChatRoom
                        name={(index !== null) ? friends[index].name : null}
                        address={(index !== null) ? friends[index].publicKey : null}
                        myContract={props.myContract}
                        openToast={openToast}
                    />
                </div>
                {toast && <Toast />}
            </div>
            <Modals
                codeRef={codeRef}
                validTimeRef={validTimeRef}
                generateCode={generateCode}
                addFriend={addFriend}
                load={load}
                openToast={openToast}
            />
        </div>
    )
}