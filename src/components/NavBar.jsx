import { CopyToClipboard } from "react-copy-to-clipboard";
import { toastType } from "../redux/states/Toast";
import LogoImg from "../images/blocktalk_t.png"

export const NavBar = ({ name, address, openToast }) => {
    return (
        <div className="NavBar">
            <div className="Logo">
                <img src={LogoImg} alt="blocktalk_t.png"></img>
                <span>BLOCKTALK</span>
            </div>
            <div className="User">
                <CopyToClipboard
                    text={name}
                    onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}
                >
                    <span className="Name">{name}</span>
                </CopyToClipboard>
                <CopyToClipboard
                    text={address}
                    onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}
                >
                    <span className="Address">{address.substring(0, 10) + "..."}</span>
                </CopyToClipboard>
            </div>
        </div>
    )
}