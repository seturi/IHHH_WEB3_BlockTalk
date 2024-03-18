import { useNavigate } from "react-router-dom";
import LogoImg from "../images/blocktalk_t.png"

export const Login = (props) => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginSuccess = await props.login();
        if (loginSuccess) {
            navigate("/main");
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
    )
}