import { useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { open, toastType } from "../redux/states/Toast";
import LogoImg from "../images/blocktalk_t.png"

export const NavBar = (props) => {
    const dispatch = useDispatch();

    const openToast = (type, message) => {
        const payload = {
            type: type,
            message: message
        };

        dispatch(open(payload));
    };

    return (
        <div className="NavBar">
            <div className="Logo">
                <img src={LogoImg} alt="blocktalk_t.png"></img>
                <span>BLOCKTALK</span>
            </div>
            <div className="User">
                <CopyToClipboard
                    text={props.name}
                    onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}
                >
                    <span className="Name">{props.name}</span>
                </CopyToClipboard>
                <CopyToClipboard
                    text={props.address}
                    onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}
                >
                    <span className="Address">{props.address.substring(0, 10) + "..."}</span>
                </CopyToClipboard>
            </div>
        </div>
    )
}