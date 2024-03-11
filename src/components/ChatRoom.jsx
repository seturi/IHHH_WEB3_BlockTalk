import { useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TextareaAutosize from "react-textarea-autosize";
import { Message } from "./Components"
import { open, toastType } from "../redux/states/Toast";
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

const Input = ({ inputText, handleInputChange, handleEnter, inputRef, setRowHeight }) => {
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
            />
        </div>
    );
};

export const ChatRoom = ({ name, address }) => {
    const dispatch = useDispatch();
    const index = useSelector(state => state.chat.index);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [rowHeight, setRowHeight] = useState();
    const inputRef = useRef();
    const messagePanelRef = useRef();

    const getMessages = async () => {
        let name;
        let messages = [];
    };

    const handleRefresh = () => {
        getMessages();
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            name: "",
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            isMine: true,
        };
        setMessages([...messages, newMessage]);
        setInputText("");
        inputRef.current.focus();
    };

    const handleEnter = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const openToast = (type, message) => {
        const payload = {
            type: type,
            message: message
        };

        dispatch(open(payload));
    };

    useLayoutEffect(() => {
        getMessages();

        if (messagePanelRef.current) {
            messagePanelRef.current.style.height = 434 - rowHeight + "px";
            messagePanelRef.current.scrollTop = messagePanelRef.current.scrollHeight;
        }
    }, [messages.length, rowHeight]);

    const Close = () => {
        return (
            <div className="Close">
                <CloseImg
                    width={28}
                    height={28}
                    fill="white"
                    onClick={() => dispatch(setIndex(null))}
                />
            </div>
        )
    }

    const Send = () => {
        return (
            <div className="Send">
                <SendImg
                    width={44}
                    height={40}
                    onClick={handleSend}
                />
            </div>
        )
    };
    /* TODO: 새로고침 이벤트 핸들링
    const handleRefresh = async () => {
        
    };*/
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
                            <Close />
                        </div>
                    </div>
                    <div className="MessagePanel" ref={messagePanelRef}>
                        <Message name="name1" text="hello" time="00:00" isMine={false} />
                        {messages.map((msg, index) => {
                            const nextMsg = messages[index + 1];
                            const showTime = !nextMsg || nextMsg.time !== msg.time || nextMsg.isMine !== msg.isMine;

                            return (
                                <Message
                                    key={index}
                                    name={msg.name}
                                    text={msg.text}
                                    time={showTime ? msg.time : undefined}
                                    isMine={msg.isMine}
                                />
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
                        />
                        <Send handleSend={handleSend} />
                    </div>
                </> : null
            }
        </div>
    )
};