import React, {useState} from "react";
import { NavBar, SideBar, ChatRoom, Message } from "../components/Components"

export default function Main(props) {
    const [friends, setFriends] = useState(null);
    const [activeChat, setActiveChat] = useState({ friendname: null, publicKey: null });
    const [activeChatMessages, setActiveChatMessages] = useState(null);
    const myContract = props.myContract;
    const myPublicKey = props.address;

    // TODO: addChat()

    // Fetch chat messages with a friend 
    async function getMessage( friendsPublicKey ) {
        let nickname;
        let messages = [];
        friends.forEach( ( item ) => {
        if( item.publicKey === friendsPublicKey )
            nickname = item.name;
        });
        // Get messages
        const data = await myContract.readMessage( friendsPublicKey );
        data.forEach( ( item ) => {
        const time = new Date( 1000 * item[2].toNumber() ).toUTCString();
        messages.push({ "publicKey": item[0], "text": item[1], "time": time });
        });
        setActiveChat({ friendname: nickname, publicKey: friendsPublicKey });
        setActiveChatMessages( messages );
    }

    // Sends messsage to an user 
    async function sendMessage( data ) {
        if( !( activeChat && activeChat.publicKey ) ) return;
        const recieverAddress = activeChat.publicKey;
        await myContract.sendMessage( recieverAddress, data );
    } 

    // This executes every time page renders and when myPublicKey or myContract changes
    // useEffect( () => {
    //     async function loadFriends() {
    //     let friendList = [];
    //     // Get Friends
    //     try {
    //         const data = await myContract.getMyFriendList();
    //         data.forEach( ( item ) => {
    //         friendList.push({ "publicKey": item[0], "name": item[1] });
    //         })
    //     } catch(err) {
    //         friendList = null;  
    //     }
    //     setFriends( friendList );
    //     }
    //     loadFriends();
    // }, [myPublicKey, myContract]);

    // Makes Cards for each Message
    const Messages = activeChatMessages ? activeChatMessages.map( ( message ) => {
        let sender = activeChat.friendname;
        let isMine = false;
        if( message.publicKey === myPublicKey ) {
            sender = "";
            isMine = true;
        }
        return (
            <Message name={sender} text={message.text} time={ message.time } isMine={isMine} />
        );
    }) : null;

    return (
        <div className="Main">
            <div className="Container">
                <NavBar name={props.name} address={props.address} />
                <div className="Contents">
                    <SideBar />
                    <ChatRoom name="name1" address="0x1" />
                </div>
            </div>
        </div>
    )
}