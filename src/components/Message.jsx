export const Message = (props) => {
    return (
        <div className="Message">
            <span className="Name">{props.name}</span>
            <div className="Contents">
                <span className="Text">{props.text}</span>
                <span className="Time">{props.time}</span>
            </div>
        </div>
    );
}