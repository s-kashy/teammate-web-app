import React, { Component } from "react"
import "./ChatBoardTeam.css"
import Input from "../../Component/Input/Input"

class ChatBoardTeam extends Component {
    state = {
        valueMsg: " ",
        message: {
            value: "",
            error: false,

        }
    }
    onChangeHandler = (event) => {
        console.log(event.target.value)
        let copyMessage={...this.state.message}
        copyMessage.value=event.target.value
        
        this.setState({ message:copyMessage })
    }
    onClickSendMsgHandler = () => { }
    render() {
        let { message } = this.state
        return (<div className="wrapper-chat-bored">
            <div className="chat-team-bored">

            </div>

            <div className="wrapper-input-chat-input">
                <Input classInput="input-chat-board" id="message" value={message.value} name="message"
                    change={(e) => this.onChangeHandler(e)}
                />
                <button onClick={this.onClickSendMsgHandler} className="send-msg-chat-board"></button>
            </div>

        </div>)
    }
}
export default ChatBoardTeam