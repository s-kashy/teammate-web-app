
const mongoose = require("mongoose")
var ChatTeam = mongoose.model("ChatTeam")
const { All_USERS_RESULT, CONNECTION, SEND_MESSAGE, MESSAGE, JOIN, WELCOME_MESSAGE, GET_ALL_USERS_IN_CHAT, DISCONNECT } = require("./socketTypes")
const { addUser, removeUser, getUsersInRoom, getUser } = require("./userSocketsManager")
const { generateMessage } = require("./util")

module.exports = (io) => {
    io.on(CONNECTION, (socket) => {
        socket.on(JOIN, ({ username, room }, callback) => {
            console.log("room", room, "username", username)
            socket.join(room)
            socket.emit(MESSAGE, generateMessage("Admin", WELCOME_MESSAGE))
            socket.broadcast.to(room).emit(MESSAGE, generateMessage(username, `the ${username} join the chat`))
            const { error, user } = addUser({ id: socket.id, username, room })
            if (error === 400) {
                callback(400)
            } else {
                callback(user)
            }
        })
        socket.on(SEND_MESSAGE, (messageReceive) => {
            console.log("msg from clint", messageReceive)
            const user = getUser(socket.id)
         
            if (user) {
                socket.broadcast.to(user.room).emit(MESSAGE, messageReceive)
                ChatTeam.findOne({ teamId: user.room }).then(docs => {
                    console.log('docs',docs)
                    docs.teamMessages.push({ name: user.username, message: messageReceive })
                    docs.save((err) => {
                        if (err) {
                            console.log("err save")
                        } else {
                            console.log("chat message", docs)
                        }
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        })
        socket.on(GET_ALL_USERS_IN_CHAT, () => {
            const user = getUser(socket.id)
            if (user) {
                const users = getUsersInRoom(user.room)
                if (users.length > 0) {
                    io.to(user.room).emit(All_USERS_RESULT, users);
                }
            }
        })

        socket.on(DISCONNECT, () => {
            console.log("disconnect")
            const user = removeUser(socket.id)
            var updateUsersInChat = getUsersInRoom(socket.id)
            console.log("disconnect",updateUsersInChat,"user left",user)
            if (user) {
                io.to(user.room).emit(MESSAGE, generateMessage(user.username, `the ${user.username} left the chat`))
                io.to(user.room).emit(All_USERS_RESULT, updateUsersInChat)
            }
        })
    })
}