import React from "react";

export function ChatCard(props) {
    return (
        <div className="ChatCard">
            <div className="User">
                <span className="Name">{props.name}</span>
                <span className="Address">{props.address}</span>
            </div>
        </div>
    )
}