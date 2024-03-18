import { useDispatch } from "react-redux";
import { setIndex } from "../redux/states/Chat"

export const ChatCard = ({ index, name, address }) => {
    const dispatch = useDispatch();

    return (
        <div className="ChatCard" onClick={() => dispatch(setIndex(index))}>
            <div className="User">
                <span className="Name">{name}</span>
                <span className="Address">{address.substring(0, 10) + "..."}</span>
            </div>
        </div>
    )
}