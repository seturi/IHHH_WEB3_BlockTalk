import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LogoImg from "../images/blocktalk_t.png"

export function NavBar(props) {
    return (
        <div className="NavBar">
            <div className="Logo">
                <img src={LogoImg} alt="blocktalk_t.png"></img>
                <span>BLOCKTALK</span>
            </div>
            <div className="User">
                <CopyToClipboard text={props.name}>
                    <span className="Name">{props.name}</span>
                </CopyToClipboard>
                <CopyToClipboard text={props.address}>
                    <span className="Address">{props.address.substring(0, 10) + "..."}</span>
                </CopyToClipboard>
            </div>
        </div>
    )
}