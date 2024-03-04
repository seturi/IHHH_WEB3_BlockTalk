import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import CopyToClipboard from "react-copy-to-clipboard";
import { setAddModal, setGenModal, setEntModal } from "../redux/states/Modals";
import { open, toastType } from "../redux/states/Toast";

export const Modals = ({ codeRef, validTimeRef, generateCode, addFriend, load }) => {
    const dispatch = useDispatch();
    const addModal = useSelector(state => state.modal.addModal);
    const genModal = useSelector(state => state.modal.genModal);
    const entModal = useSelector(state => state.modal.entModal);

    const openAddModal = () => {
        dispatch(setAddModal(true));
        dispatch(setGenModal(false));
        dispatch(setEntModal(false));
    };

    const openGenModal = () => {
        dispatch(setAddModal(false));
        dispatch(setGenModal(true));
        generateCode();
    };

    const openEntModal = () => {
        dispatch(setAddModal(false));
        dispatch(setEntModal(true));
    };

    const closeModal = () => {
        dispatch(setAddModal(false));
        dispatch(setGenModal(false));
        dispatch(setEntModal(false));
    };

    const openToast = (type, message) => {
        const payload = {
            type: type,
            message: message
        };

        dispatch(open(payload));
    };

    const AddModal = () => {
        return (
            <div className="AddModal">
                <div className="Body">
                    <span className="Title">Add new chat</span>
                    <div className="Select">
                        <button className="Generate" onClick={openGenModal}>Generate code</button>
                        <button className="Enter" onClick={openEntModal}>Enter code</button>
                    </div>
                    <div className="Close">
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div >
        )
    };

    const GenModal = () => {
        const Timer = () => {
            const [minute, setMinute] = useState(validTimeRef.current.minute);
            const [second, setSecond] = useState(validTimeRef.current.second);
            const requestId = useRef();

            useEffect(() => {
                const timer = () => {
                    setMinute(validTimeRef.current.minute);
                    setSecond(validTimeRef.current.second);

                    if (validTimeRef.current.time <= 0) {
                        cancelAnimationFrame(requestId.current);
                    } else {
                        requestId.current = requestAnimationFrame(timer);
                    }
                };

                requestId.current = requestAnimationFrame(timer);

                return () => {
                    cancelAnimationFrame(requestId.current);
                };
            });

            return (
                <div className="Timer">
                    <span className="Timer">{minute}:{second}</span>
                </div>
            )
        };

        return (
            <div className="GenModal">
                <div className="Body">
                    <span className="Title">Generate code</span>
                    {(codeRef.current.code) ?
                        <>
                            <div className="Return">
                                <CopyToClipboard
                                    text={codeRef.current.code}
                                    onCopy={() => openToast(toastType.SUCC, "Copied to clipboard")}
                                >
                                    <span className="Code">{codeRef.current.code}</span>
                                </CopyToClipboard>
                                <Timer />
                            </div>
                            <div className="Select">
                                <button onClick={openAddModal}>back</button>
                                <button onClick={closeModal}>Close</button>
                            </div>
                        </> : <>
                            <div className="Loading">
                                <PulseLoader color="white" size={10} />
                            </div>
                            <div className="bottom"></div>
                        </>
                    }
                </div>
            </div >
        )
    };

    const EntModal = () => {
        const [code, setCode] = useState("");
        const inputRef = useRef(null);

        const handleChange = (event) => {
            setCode(event.target.value);
        };

        const submit = () => {
            addFriend(code);
        };

        useLayoutEffect(() => {
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        });

        const Input = () => {
            return (
                <div className="Input">
                    <input ref={inputRef} type="text" maxLength={7} value={code} onChange={handleChange} />
                    <button onClick={submit} disabled={code.length < 7}>submit</button>
                </div>
            )
        };

        return (
            <div className="EntModal">
                <div className="Body">
                    <span className="Title">Enter code</span>
                    {(!load) ?
                        <>
                            <Input />
                            <div className="Select">
                                <button onClick={openAddModal}>back</button>
                                <button onClick={closeModal}>Close</button>
                            </div>
                        </> : <>
                            <div className="Loading">
                                <PulseLoader color="white" size={10} />
                            </div>
                            <div className="bottom"></div>

                        </>
                    }
                </div >
            </div >
        )
    };

    return (
        <div className="Modals">
            {addModal && <AddModal />}
            {genModal && <GenModal />}
            {entModal && <EntModal />}
        </div>
    )
};