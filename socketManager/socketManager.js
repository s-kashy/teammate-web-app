
const mongoose = require("mongoose")
var ChatTeam = mongoose.model("ChatTeam")
const { All_USERS_RESULT, CONNECTION, SEND_MESSAGE, MESSAGE, JOIN, WELCOME_MESSAGE, GET_ALL_USERS_IN_CHAT, DISCONNECT } = require("./socketTypes")
const { addUser, removeUser, getUsersInRoom, getUser } = require("./userSocketsManager")
const { generateMessage } = require("./util")

module.exports = (io) => {
    io.on(CONNECTION, (socket) => {
        socket.on(JOIN, ({ username, room }, callback) => {
            socket.join(room)
            socket.emit(MESSAGE, generateMessage("Admin", WELCOME_MESSAGE))
            socket.broadcast.to(room).emit(MESSAGE, generateMessage(username, `The ${username} join the chat`))
            const { error, user } = addUser({ id: socket.id, username, room })
            if (error === 400) {
                callback(400)
            } else {
                callback(user)
            }
        })
        socket.on(SEND_MESSAGE, (messageReceive) => {
            const user = getUser(socket.id)
            if (user) {
                socket.broadcast.to(user.room).emit(MESSAGE, messageReceive)
                ChatTeam.findOneAndUpdate({ teamId: user.room }, { $push: { teamMessages: messageReceive } },
                    {new:true}).then(docs => {
                    console.log(docs)
                }).catch(err => {

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
            const user = removeUser(socket.id)
            var updateUsersInChat = getUsersInRoom(socket.id)
            console.log("disconnect", updateUsersInChat, "user left", user)
            if (user) {
                io.to(user.room).emit(MESSAGE, generateMessage(user.username, `the ${user.username} left the chat`))
                io.to(user.room).emit(All_USERS_RESULT, updateUsersInChat)
            }
        })
    })
}