import React, { Component } from "react"
import "./ChatBoardTeam.css"
import Spinner from "../../Component/Ui/Spinner/Spinner"
import { connect } from "react-redux"
import moment from "moment"
import ChatMessage from "../../Component/ChatMessage/ChatMessage"
import { JOIN, All_USERS_RESULT, MESSAGE, URL_SOCKET, SEND_MESSAGE, CONNECT_CLIENT, GET_ALL_USERS_IN_CHAT } from "./socketClientType"
import * as actionType from "../../Store/actions/index"
import Input from "../../Component/Input/Input"
import io from "socket.io-client"
const socketUrl = URL_SOCKET
var socket = null
class ChatBoardTeam extends Component {
    constructor(props) {
        super(props)
        this.messageElement = React.createRef();
        this.state = {
            message: {
                value: "",
            },
            allUserInChat: [],
            isLoading: false,
            messages: []
        }
    }
    componentDidMount() {
        socket.on(CONNECT_CLIENT, () => {
            if (socket.connected) {
                this.initSocket()
            }
        })
        this.getAllMessages()

    }
    componentWillUnmount() {
        socket.disconnect()
        this.props.clearSelectedTeam()
        this.props.clearAllTeams()
        this.props.clearAllMessages()
        this.props.history.push("/")
    }
    componentWillMount() {
        socket = io(socketUrl)
    }
    initSocket = () => {
        const { _id } = this.props.teamSelected
        socket.emit(JOIN, { username: this.props.email, room: _id }, (err) => {
            if (err === 400) {
                this.props.openErrorMsg()
                setTimeout(() => {
                    this.props.history.push("/")
                }, 1500)
                return
            }
        })

        this.setState({ isLoading: true })
        socket.emit(GET_ALL_USERS_IN_CHAT)
        socket.on(MESSAGE, (msg) => {
            let messagesCopy = JSON.parse(JSON.stringify(this.state.messages))
            messagesCopy.push(msg)
            this.setState({ messages: messagesCopy }, () => {

            })
        })

        socket.on(All_USERS_RESULT, (users) => {
            this.setState({ allUserInChat: users }, () => {
                console.log("all user in the chat", this.state.allUserInChat)
            })
        })

    }
    getAllMessages = () => {
        const { _id } = this.props.teamSelected
        this.props.getAllTeamMessages(_id).then(res => {
            if (this.props.teamMessages.length>0) {
             let messages=[...this.state.messages,...this.props.teamMessages]
             this.setState({messages})
            }
        }).catch(err=>{
            this.props.history.push("/")
        })
        console.log("ref", this.messageElement.current)
    }
    onChangeHandler = (event) => {
        let copyMessage = { ...this.state.message }
        copyMessage.value = event.target.value
        this.setState({ message: copyMessage })
    }
    onClickSendMsgHandler = () => {
        socket.emit(SEND_MESSAGE, { message: this.state.message.value, date: this.getFormatTime(), name: this.props.email.split("@")[0] })
        let copyState = { ...this.state }
        copyState.messages.push({ message: copyState.message.value, date: this.getFormatTime(), name: this.props.email.split("@")[0] })
        copyState.message.value = ""
        this.setState({ messages: copyState.messages, message: copyState.message }, () => {
        })

    }
    getFormatTime = () => {
        var dateTime = Date.now();
        dateTime = moment(dateTime).format("HH:mm DD-MM-YYYY").toString()
        return dateTime
    }
    render() {
        let { message } = this.state
        let arrayMessage = []
        if (this.state.messages.length > 0) {
            arrayMessage = this.state.messages.map((item, index) => {
                return (<ChatMessage key={index} name={item.name} message={item.message} date={item.date} />)
            })

        }
        return (<div>{this.state.isLoading ?
            <div className="wrapper-chat-bored" ref={this.messageElement}>
                <div className="chat-team-bored">
                    {arrayMessage}
                </div>
                <div className="wrapper-input-chat-board">
                    <Input placeholder="Type your message" classInput="input-chat-board" id="message" value={message.value} name="message"
                        change={(e) => this.onChangeHandler(e)}
                    />
                    <button onClick={this.onClickSendMsgHandler} className="send-msg-chat-board"></button>
                </div>

            </div> : <Spinner />}</div>)
    }
}
const mapStateProps = state => {
    return {
        email: state.user.email,
        teamSelected: state.teamCreateInfo.teamSelected,
        teamMessages: state.messageTeamBoard.messages
    }
}
const mapStateDispatch = dispatch => {
    return {
        clearSelectedTeam: () => dispatch(actionType.clearSelectedTeam()),
        getAllTeamMessages: (teamId) => dispatch(actionType.getAllTeamMessages(teamId)),
        openErrorMsg: () => dispatch(actionType.openErrorMsg()),
        clearAllTeams: () => dispatch(actionType.clearAllTeams()),
        clearAllMessages:()=>dispatch(actionType.clearAllMessages())
    }
}
export default connect(mapStateProps, mapStateDispatch)(ChatBoardTeam)