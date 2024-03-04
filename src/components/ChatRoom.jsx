import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Message } from "./Components"
import { open, toastType } from "../redux/states/Toast";
import { ReactComponent as RefImg } from "../images/refresh.svg"
import { ReactComponent as SendImg } from "../images/send.svg"

function Refresh({ onRefresh }) {
    return (
        <div className="Refresh" onClick={onRefresh}>
            <RefImg width={28} height={28} fill="white" />
        </div>
    )
}

function Input({ inputText, handleInputChange }) {
    return (
        <div className="Input">
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
            />
        </div>
    );
}

export function ChatRoom(props) {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);

    const handleInputChange = (event) => setInputText(event.target.value);

    const Send = () => {
        return (
            <div className="Send">
                <SendImg
                    width={40}
                    height={40}
                    color="white"
                    onClick={handleSend}
                />
            </div>
        )
    };

    const handleSend = () => {
        // TODO: 메시지 전송
        const newMessage = { text: inputText, timestamp: new Date().toISOString() };
        setMessages([...messages, newMessage]);
        setInputText("");
    };

    const openToast = (type, message) => {
        const payload = {
            type: type,
            message: message
        };

        dispatch(open(payload));
    };
    /* TODO: 새로고침 이벤트 핸들링
    const handleRefresh = async () => {
        
    };
    */

    return (
        <div className="ChatRoom">
            <div className="TopBar">
                <div className="UserInfo">
                    <CopyToClipboard
                        text={props.name}
                        onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}
                    >
                        <span className="Name">{props.name}</span>
                    </CopyToClipboard>
                    <CopyToClipboard
                        text={props.address}
                        onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}
                    >
                        <span className="Address">{props.address.substring(0, 10) + "..."}</span>
                    </CopyToClipboard>
                </div>
                <Refresh />
            </div>
            <div className="MessagePanel">
                <Message name="name1" text="hello" time="00:00" isMine={false} />
                <Message text="안녕하세요. 만나게 되어 반갑습니다. 어디에서 오셨나요?" time="00:01" isMine={true} />
                <Message text="대답." time="00:01" isMine={true} />
                <Message name="name1" text="Wut" time="00:02" isMine={false} />
                <Message text="대답." time="00:02" isMine={true} />
            </div>
            <div className="Bottom">
                <Input inputText={inputText} handleInputChange={handleInputChange} />
                <Send />
            </div>
        </div>
    )
}