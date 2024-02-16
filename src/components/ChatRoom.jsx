import React from "react";
import { Refresh, Message, Input, Send } from "./Components"

export function ChatRoom(props) {
    return (
        <div className="ChatRoom">
            <div className="TopBar">
                <div className="UserInfo">
                    <span className="Name">{props.name}</span>
                    <span className="Address">{props.address}</span>
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