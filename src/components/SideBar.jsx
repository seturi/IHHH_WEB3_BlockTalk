import { ChatCard } from "./Components";
import { ReactComponent as AddImg } from "../images/add.svg"

export const SideBar = ({ setAddModal }) => {
    const AddNewChat = () => {
        return (
            <div className="AddNewChat" onClick={() => setAddModal(true)}>
                <AddImg width={40} height={40} fill="white" />
            </div>
        )
    };

    return (
        <div className="SideBar">
            <div className="TopBar">Chats</div>
            <div className="ChatCardPanel">
                <ChatCard name="name1" address="0x1" />
            </div>
            <div className="Bottom">
                <AddNewChat />
            </div>
        </div>
    )
}