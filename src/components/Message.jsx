export function Message(props) {
    const messageSender = props.isMine ? "Message MyMessage" : "Message";

    return (
        <div className={messageSender}>
            <span className="Name">{props.name}</span>
            <div className="Contents">
                <span className="Text">{props.text}</span>
                <span className="Time">{props.time}</span>
            </div>
        </div>
    );
}