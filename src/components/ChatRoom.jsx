import React, {useState, useRef, useEffect} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Message } from "./Components"
import { ReactComponent as RefImg } from "../images/refresh.svg"
import { ReactComponent as SendImg } from "../images/send.svg"

function Refresh({ handleRefresh }) {
    return (
        <div className="Refresh" onClick={handleRefresh}>
            <RefImg width={28} height={28} fill="white" />
        </div>
    )
}

function Input({ inputText, handleInputChange, handleEnter}) {
    return (
        <div className="Input">
            <input 
                type="text" 
                value={inputText} 
                onChange={handleInputChange} 
                onKeyDown={handleEnter}
            />
        </div>
    );
}

function Send({ handleSend }) {
    return (
        <div className="Send" onClick={handleSend}>
            <SendImg width={40} height={40} color="white"/>
        </div>
    );
}


export function ChatRoom(props) {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const messagePanelRef = useRef(null);

    const handleInputChange = (event) => setInputText(event.target.value);

    const handleSend = () => {
        if (!inputText.trim()) return;
        
        const newMessage = { 
            name: "",
            text: inputText, 
            time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), 
            isMine: true, };
        setMessages([...messages, newMessage]);
        setInputText("");
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
          handleSend();
        }
    };

    const getMessages = async () => {
        let name;
        let messages = [];
        
    };

    const handleRefresh = () => {
        getMessages();
    };

    useEffect(() => {
        getMessages();
        if (messagePanelRef.current) {
            messagePanelRef.current.scrollTop = messagePanelRef.current.scrollHeight;
        }
    }, [messages.length]);

    return (
        <div className="ChatRoom">
            <div className="TopBar">
                <div className="UserInfo">
                    <CopyToClipboard text={props.name}>
                        <span className="Name">{props.name}</span>
                    </CopyToClipboard> 
                    <CopyToClipboard text={props.address}>
                        <span className="Address">{props.address.substring(0, 10) + "..."}</span>
                    </CopyToClipboard>
                </div>
                <Refresh handleRefresh={handleRefresh}/>
            </div>
            <div className="MessagePanel" ref={messagePanelRef}>
                <Message name="name1" text="hello" time="00:00" isMine={false} />
                {messages.map((msg, index) =>  {
                    const nextMsg = messages[index + 1];
                    const showTime = !nextMsg || nextMsg.time !== msg.time || nextMsg.isMine !== msg.isMine;

                    return (
                        <Message 
                            key={index}
                            name={msg.name} 
                            text={msg.text} 
                            time={showTime ? msg.time: undefined} 
                            isMine={msg.isMine} 
                        />
                    );
                })}
            </div>
            <div className="Bottom">
                <Input inputText={inputText} handleInputChange={handleInputChange} handleEnter={handleEnter} />
                <Send handleSend={handleSend} />
            </div>
        </div>
    )
}