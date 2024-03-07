import { useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Message } from "./Components"
import { open, toastType } from "../redux/states/Toast";
import { ReactComponent as RefImg } from "../images/refresh.svg"
import { ReactComponent as SendImg } from "../images/send.svg"

export const ChatRoom = ({ name, address }) => {
    const dispatch = useDispatch();
    const index = useSelector(state => state.chat.index);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    useLayoutEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    });

    const Refresh = () => {
        return (
            <div className="Refresh" >
                <RefImg width={28} height={28} fill="white" />
            </div>
        )
    };

    const Input = () => {
        return (
            <div className="Input">
                <input ref={inputRef} type="text" value={inputText} onChange={handleChange} />
            </div>
        );
    };

    const Send = () => {
        return (
            <div className="Send">
                <SendImg
                    width={40}
                    height={40}
                    color="white"
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
                        text={name} onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}>
                        <span className="Name">{name}</span>
                    </CopyToClipboard>
                    <CopyToClipboard text={address} onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}>
                        <span className="Address">{address ? address.substring(0, 10) + "..." : null}</span>
                    </CopyToClipboard>
                </div>
                <Refresh />
            </div>
            {(index !== null) ?
                <div className="MessagePanel">
                    <Message name={name} text="hello" time="00:00" isMine={false} />
                    <Message text="안녕하세요. 만나게 되어 반갑습니다. 어디에서 오셨나요?" time="00:01" isMine={true} />
                    <Message text="대답." time="00:01" isMine={true} />
                    <Message name={name} text="Wut" time="00:02" isMine={false} />
                    <Message text="대답." time="00:02" isMine={true} />
                </div> : <div className="Picture"></div>
            }
            <div className="Bottom">
                {(index !== null) &&
                    <>
                        <Input />
                        <Send />
                    </>
                }
            </div>
        </div>
    )
};