import React from "react";
import { NavBar, SideBar, ChatRoom } from "../components/Components"

export default function Main(props) {
    return (
        <div className="Main">
            <div className="Container">
                <NavBar name="name0" address="0x0" />
                <div className="Contents">
                    <SideBar />
                    <ChatRoom name="name1" address="0x1" />
                </div>
            </div>
        </div>
    )
}