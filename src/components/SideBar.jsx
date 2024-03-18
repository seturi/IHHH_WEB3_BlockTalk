import { useDispatch } from "react-redux";
import { ChatCard } from "./Components";
import { ReactComponent as AddImg } from "../images/add.svg"
import { setAddModal } from "../redux/states/Modals";

export const SideBar = ({ friends }) => {
    const dispatch = useDispatch();

    const AddNewChat = () => {
        return (
            <div className="AddNewChat">
                <AddImg
                    width={40}
                    height={40}
                    fill="white"
                    onClick={() => dispatch(setAddModal(true))}
                />
            </div>
        )
    };

    return (
        <div className="SideBar">
            <div className="TopBar">Chats</div>
            <div className="ChatCardPanel">
                {friends.map((friend, index) => (
                    <ChatCard key={index} index={index} name={friend.name} address={friend.publicKey} />
                ))}
            </div>
            <div className="Bottom">
                <AddNewChat />
            </div>
        </div>
    )
};