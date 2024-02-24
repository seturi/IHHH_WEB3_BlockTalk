import React from "react";
import { ChatCard } from "./Components";
import { ReactComponent as AddImg } from "../images/add.svg"

export function SideBar() {
    function AddNewChat(props) {
        return (
            <div className="AddNewChat">
                <AddImg width={40} height={40} fill="white" />
            </div>
        );
    }

    return (
        <div className="SideBar">
            <div className="TopBar">Chats</div>
            <div className="ChatCardPanel">
                <ChatCard name="name1" address="0x1" />
            </div>
            <div className="Bottom">
                <AddNewChat />
            </div>
        </div>
    )
}