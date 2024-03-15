import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TextareaAutosize from "react-textarea-autosize";
import { Message } from "./Components"
import { toastType } from "../redux/states/Toast";
import { ReactComponent as RefImg } from "../images/refresh.svg"
import { ReactComponent as CloseImg } from "../images/close.svg"
import { ReactComponent as SendImg } from "../images/send.svg"
import { setIndex } from "../redux/states/Chat";

const Refresh = ({ handleRefresh }) => {
    return (
        <div className="Refresh">
            <RefImg
                width={28}
                height={28}
                fill="white"
                onClick={handleRefresh}
            />
        </div>
    )
};

const Input = ({ inputText, handleInputChange, handleEnter, inputRef, setRowHeight, inputDisabled }) => {
    return (
        <div className="Input">
            <TextareaAutosize
                ref={inputRef}
                cacheMeasurements
                autoFocus
                maxRows={5}
                onHeightChange={(rowHeight) => setRowHeight(rowHeight)}
                spellCheck={false}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                disabled={inputDisabled}
            />
        </div>
    );
};

const Send = ({ handleSend, inputText, inputDisabled }) => {
    const [sendDisabled, setSendDisabled] = useState(true);

    useEffect(() => {
        if (!inputText.trim() || inputDisabled) {
            setSendDisabled(true);
        } else {
            setSendDisabled(false);
        }
    }, [inputText, inputDisabled])

    return (
        <div className={`Send ${sendDisabled && "disabled"}`}>
            <SendImg
                width={44}
                height={40}
                onClick={() => { (!sendDisabled) && handleSend() }}
            />
        </div >
    )
};

const Close = ({ handleClose }) => {
    return (
        <div className="Close">
            <CloseImg
                width={28}
                height={28}
                fill="white"
                onClick={handleClose}
            />
        </div>
    )
};

export const ChatRoom = ({ name, address, myContract, openToast }) => {
    const dispatch = useDispatch();
    const index = useSelector(state => state.chat.index);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [rowHeight, setRowHeight] = useState();
    const [inputDisabled, setInputDisabled] = useState(false);
    const inputRef = useRef();
    const messagePanelRef = useRef();

    const getMessages = async () => {
        let nickname;
        let isMine;
        let time;
        let activeMessages = []

        const data = await myContract.readMessage(address);
        data.forEach((item) => {
            time = new Date(1000 * item[1].toNumber()).toUTCString();
            if (item[0] === address) {
                nickname = name;
                isMine = false;
            } else {
                nickname = "";
                isMine = true;
            }

            const msg = {
                name: nickname,
                text: item[2],
                time: time,
                isMine: isMine,
            };
            activeMessages.push(msg);
        });
        setMessages(activeMessages);
    };

    const sendMessage = async (data) => {
        await myContract.sendMessage(address, data);
    }

    const handleRefresh = () => {
        getMessages();
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const newMessage = {
            name: "",
            text: inputText,
            time: new Date().toUTCString(),
            isMine: true,
        };

        try {
            setInputDisabled(true);
            await sendMessage(inputText);
            setMessages([...messages, newMessage]);
            setInputDisabled(false);
            setInputText("");
        } catch (err) {
            setInputDisabled(false);
            openToast(toastType.FAIL, err.error?.message.substring(20) || "User denied transation signature");
        }
    };

    const handleEnter = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleClose = () => {
        setInputText("");
        dispatch(setIndex(null));
    };

    useLayoutEffect(() => {
        if (index !== null) getMessages();

        if (messagePanelRef.current) {
            messagePanelRef.current.style.height = 434 - rowHeight + "px";
            messagePanelRef.current.scrollTop = messagePanelRef.current.scrollHeight;
        }
    },);

    return (
        <div className="ChatRoom">
            {(index !== null) ?
                <>
                    <div className="TopBar">
                        <div className="UserInfo">
                            <CopyToClipboard
                                text={name} onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}>
                                <span className="Name">{name}</span>
                            </CopyToClipboard>
                            <CopyToClipboard text={address} onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}>
                                <span className="Address">{address.substring(0, 10) + "..."}</span>
                            </CopyToClipboard>
                        </div>
                        <div className="Buttons">
                            <Refresh handleRefresh={handleRefresh} />
                            <Close handleClose={handleClose} />
                        </div>
                    </div>
                    <div className="MessagePanel" ref={messagePanelRef}>
                        {messages.map((msg, index) => {
                            const prevMsg = index > 0 ? messages[index - 1] : null;
                            const nextMsg = messages[index + 1];

                            const currentTime = new Date(msg.time).toLocaleTimeString([],
                                { hour: 'numeric', minute: '2-digit' });
                            const nextTime = nextMsg ? new Date(nextMsg.time).toLocaleTimeString([],
                                { hour: 'numeric', minute: '2-digit' }) : null;
                            const showTime = !nextMsg || nextTime !== currentTime || nextMsg.isMine !== msg.isMine;

                            const prevDate = prevMsg ? new Date(prevMsg.time).toLocaleDateString([],
                                { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : null;
                            const currentDate = new Date(msg.time).toLocaleDateString([],
                                { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
                            const showDateDivider = currentDate !== prevDate;

                            return (
                                <>
                                    {showDateDivider && (
                                        <div className="dateDivider">{currentDate}</div>
                                    )}
                                    <Message
                                        key={index}
                                        name={msg.name}
                                        text={msg.text}
                                        time={showTime ? currentTime : undefined}
                                        isMine={msg.isMine}
                                    />
                                </>
                            );
                        })}
                    </div>
                    <div className="Bottom">
                        <Input
                            inputText={inputText}
                            handleInputChange={handleInputChange}
                            handleEnter={handleEnter}
                            inputRef={inputRef}
                            setRowHeight={setRowHeight}
                            inputDisabled={inputDisabled}
                        />
                        <Send
                            handleSend={handleSend}
                            inputText={inputText}
                            inputDisabled={inputDisabled}
                        />
                    </div>
                </> : <div className="Space">
                </div>
            }
        </div>
    )
};