import React from "react";
import LogoImg from "../images/blocktalk_t.png"

export function NavBar(props) {
    return (
        <div className="NavBar">
            <div className="Logo">
                <img src={LogoImg} alt="blocktalk_t.png"></img>
                <span>BLOCKTALK</span>
            </div>
            <div className="User">
                <span className="Name">{props.name}</span>
                <span className="Address">{props.address}</span>
            </div>
        </div>
    )
}