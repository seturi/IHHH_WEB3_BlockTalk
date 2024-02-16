import React from "react";
import { ReactComponent as AddImg } from "../images/add.svg"

// This Modal help Add a new friend
export function AddNewChat(props) {

    return (
        <div className="AddNewChat">
            <AddImg width={40} height={40} fill="white" />
        </div>
    );
}