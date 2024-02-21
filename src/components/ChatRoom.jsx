import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Message } from "./Components"
import { ReactComponent as RefImg } from "../images/refresh.svg"
import { ReactComponent as SendImg } from "../images/send.svg"

export function ChatRoom(props) {
    function Refresh() {
        return (
            <div className="Refresh">
                <RefImg width={28} height={28} fill="white" />
            </div>
        )
    }

    function Input() {
        return (
            <div className="Input">
                <input type="text" />
            </div>
        )
    }

    function Send() {
        return (
            <div className="Send">
                <SendImg width={40} height={40} color="white" />
            </div>
        )
    }

    return (
        <div className="ChatRoom">
            <div className="TopBar">
                <div className="UserInfo">
                    <CopyToClipboard text={props.name}>
                        <span className="Name">{props.name}</span>
                    </CopyToClipboard>
                    <CopyToClipboard text={props.name}>
                        <span className="Address">{props.address.substring(0, 10) + "..."}</span>
                    </CopyToClipboard>
                </div>
                <Refresh />
            </div>
            <div className="MessagePanel">
                <Message name="name1" text="hello" time="00:00" />
                <Message name="name1" text="hola" time="00:01" />
                <Message name="name1" text="안녕하세요" time="00:02" />
                <Message name="name1" text="abcdefghijklmnopqrstuvwxyz가나다라마바사아자차카타파하" time="00:03" />
                <Message name="name1" text="h" time="00:04" />
                <Message name="name1" text="e" time="00:05" />
                <Message name="name1" text="l" time="00:06" />
                <Message name="name1" text="l" time="00:07" />
                <Message name="name1" text="o" time="00:08" />
            </div>
            <div className="Bottom">
                <Input />
                <Send />
            </div>
        </div>
    )
}