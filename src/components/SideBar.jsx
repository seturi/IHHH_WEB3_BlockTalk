import React from "react";
import { ChatCard, AddNewChat } from "./Components";

export function SideBar() {
    return (
        <div className="SideBar">
            <div className="TopBar">Chats</div>
            <div className="ChatCardPanel">
                <ChatCard name="name1" address="0x1" />
                <ChatCard name="name2" address="0x2" />
                <ChatCard name="name3" address="0x3" />
                <ChatCard name="name4" address="0x4" />
                <ChatCard name="name5" address="0x5" />
                <ChatCard name="name6" address="0x6" />
                <ChatCard name="name7" address="0x7" />
            </div>
            <div className="Bottom">
                <AddNewChat />
            </div>
        </div>
    )
}