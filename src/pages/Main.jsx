import { useState, useEffect } from "react";
import { utils } from "ethers";
import { PulseLoader } from "react-spinners";
import CopyToClipboard from "react-copy-to-clipboard";
import { NavBar, SideBar, ChatRoom } from "../components/Components"

export const Main = (props) => {
    const [addModal, setAddModal] = useState(false);
    const [genModal, setGenModal] = useState(false);
    const [entModal, setEntModal] = useState(false);
    const [code, setCode] = useState(null);
    const [timeStamp, setTimeStamp] = useState(0);
    const [validTime, setValidTime] = useState(600);
    const [minute, setMinute] = useState("10");
    const [second, setSecond] = useState("00");

    const generateCode = async () => {
        if (!code) {
            try {
                const tx = await props.myContract.generateKeyString();
                const receipt = await tx.wait();
                console.log(receipt);
                const key = receipt.events[0].args.key;
                const code = utils.toUtf8String(key);
                setCode(code);
                const blockNumber = await props.myProvider.getBlockNumber();
                const block = await props.myProvider.getBlock(blockNumber);
                const timeStamp = block.timestamp;
                setTimeStamp(timeStamp);
            } catch (err) {
                alert("User rejected transation");
                setAddModal(true);
                setGenModal(false);
            }
        }
    }

    const handleGenModal = () => {
        setAddModal(false);
        setGenModal(true);
        generateCode();
    }

    useEffect(() => {
        if (timeStamp) {
            const interval = setInterval(() => {
                const currentTime = Math.floor(Date.now() / 1000);
                const elapsedTime = currentTime - timeStamp;
                setValidTime(600 - elapsedTime);
                setMinute(Math.floor(validTime / 60).toString().padStart(2, "0"));
                setSecond((validTime % 60).toString().padStart(2, "0"));
                console.log(minute, second);

                if (validTime <= 0) {
                    if (genModal) {
                        setAddModal(true);
                        setGenModal(false);
                        alert("Code has been expired");
                    }

                    clearInterval(interval);
                    setCode(null);
                    setTimeStamp(0);
                };
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    });

    const AddModal = () => {
        return (
            <div className="AddModal">
                <div className="Body">
                    <span className="Title">Add new chat</span>
                    <div className="Select">
                        <button className="Generate" onClick={handleGenModal}>Generate code</button>
                        <button className="Enter" onClick={() => { setAddModal(false); setEntModal(true); }}>Enter code</button>
                    </div>
                    <div className="Close">
                        <button onClick={() => setAddModal(false)}>Close</button>
                    </div>
                </div>
            </div >
        )
    };

    const GenModal = () => {
        return (
            <div className="GenModal">
                <div className="Body">
                    <span className="Title">Generate code</span>
                    {(code) ?
                        <>
                            <div className="Return">
                                <CopyToClipboard text={code}>
                                    <span className="Code">{code}</span>
                                </CopyToClipboard>
                                <span className="Timer">{minute}:{second}</span>
                            </div>
                            <div className="Select">
                                <button onClick={() => { setAddModal(true); setGenModal(false); }}>back</button>
                                <button onClick={() => setGenModal(false)}>Close</button>
                            </div>
                        </> : <>
                            <div className="Loading">
                                <PulseLoader color="white" />
                            </div>
                            <div className="bottom"></div>
                        </>
                    }
                </div>
            </div >
        )
    };

    const EntModal = () => {
        return (
            <div className="EntModal">
                <div className="Body">
                    <span className="Title">Enter code</span>
                    <div className="Input">
                        <input type="text" />
                    </div>
                    <div className="Select">
                        <button onClick={() => { setAddModal(true); setEntModal(false); }}>back</button>
                        <button onClick={() => setEntModal(false)}>Close</button>
                    </div>
                </div >
            </div>
        )
    };

    return (
        <div className="Main">
            <div className="Container">
                <NavBar name={props.name} address={props.address} />
                <div className="Contents">
                    <SideBar setAddModal={setAddModal} />
                    <ChatRoom name="name1" address="0x1" />
                </div>
                {addModal ? <AddModal /> : null}
                {genModal ? <GenModal /> : null}
                {entModal ? <EntModal /> : null}
            </div>
        </div>
    )
}