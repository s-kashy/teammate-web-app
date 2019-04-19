import React from "react"
import "./ChatMessage.css"

const ChatMessage = (props) => {

    return (<div className="chat-wrapper">
        <div className="text-chat-message">
            <p style={{ color: "white" }}>{props.message}</p>
        </div>
        <div>
        <span className="info-chat-message" >{props.name} </span><span className="info-chat-message">{props.date}</span>
        </div>
    </div>)
}

export default ChatMessage