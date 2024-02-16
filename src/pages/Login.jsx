import React from "react";
import LogoImg from "../images/blocktalk_t.png"


export default function Login(props) {
    return (
        <div className="Login" onClick={async () => { props.login(); }}>
            <div className="Container">
                <div className="Logo">
                    <img src={LogoImg} alt="blocktalk_t.png"></img>
                    <span>BLOCKTALK</span>
                </div>
                <span>Click to Login ...</span>
            </div>
        </div>
    );
}