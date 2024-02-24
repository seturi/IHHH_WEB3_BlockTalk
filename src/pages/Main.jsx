import { useState } from "react";
import { NavBar, SideBar, ChatRoom } from "../components/Components"
import CopyToClipboard from "react-copy-to-clipboard";

export const Main = (props) => {
    const [addModal, setAddModal] = useState(false);
    const [genModal, setGenModal] = useState(false);
    const [entModal, setEntModal] = useState(false);

    const AddModal = () => {
        return (
            <div className="AddModal">
                <div className="Body">
                    <span className="Title">Add new chat</span>
                    <div className="Select">
                        <button className="Generate" onClick={() => { setAddModal(false); setGenModal(true); }}>Generate code</button>
                        <button className="Enter" onClick={() => { setAddModal(false); setEntModal(true); }}>Enter code</button>
                    </div>
                    <div className="Close">
                        <button onClick={() => setAddModal(false)}>Close</button>
                    </div>
                </div>
            </div >
        )
    };

    const GenModal = (props) => {
        return (
            <div className="GenModal">
                <div className="Body">
                    <span className="Title">Generate code</span>
                    <div className="Return">
                        <CopyToClipboard text={props.code}>
                            <span className="Code">{props.code}</span>
                        </CopyToClipboard>
                    </div>
                    <div className="Select">
                        <button onClick={() => { setAddModal(true); setGenModal(false); }}>back</button>
                        <button onClick={() => setGenModal(false)}>Close</button>
                    </div>
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