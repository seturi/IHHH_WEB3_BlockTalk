import React from "react";
import LogoImg from "../images/blocktalk_t.png"
import { useNavigate } from "react-router-dom";


export default function Login(props) {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginSuccess = await props.login();
        if(loginSuccess) {
            navigate("/main");  // 로그인 성공 시 메인 페이지로 이동
        }
    };

    return (
        <div className="Login">
            <div className="Container" onClick={handleLogin}>
                <div className="Logo">
                    <img src={LogoImg} alt="blocktalk_t.png"></img>
                    <span>BLOCKTALK</span>
                </div>
                <span>Click to Login ...</span>
            </div>
        </div>
    );
}