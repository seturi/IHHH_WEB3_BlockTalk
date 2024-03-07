import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../redux/states/Toast";
import InfoImg from "../images/informational.png";
import SuccImg from "../images/success.png";
import FailImg from "../images/fail.png";

export const Toast = () => {
    const dispatch = useDispatch();
    const type = useSelector(state => state.toast.type);
    const message = useSelector(state => state.toast.message);
    const [animation, setAnimation] = useState("Toast + openAnimation");

    const closeToast = () => {
        dispatch(close());
    };

    const selectIcon = () => {
        switch (type) {
            case "informational":
                return <img src={InfoImg} alt="informational.png" />;
            case "success":
                return <img src={SuccImg} alt="success.png" />;
            case "fail":
                return <img src={FailImg} alt="fail.png" />;
            default:
                return null;
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimation("Toast  + closeAnimation");
            const close = setTimeout(() => {
                closeToast();

            }, 200);

            return () => {
                clearTimeout(close);
            };
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    });

    return (
        <div className={animation}>
            {selectIcon(type)}
            <span>{message}</span>
        </div>
    )
};
