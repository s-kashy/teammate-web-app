const users = []
const addUser = ({ id, username, room }) => {
 
    //username = username.toLowerCase()
    // room = room.trim().toLowerCase()
    if (!username || !room) {
        return {
            error: "Username and room are required"

        }
    }
    const existingUser = users.find((user) => {
        return user.username == username
    })
    if (existingUser) {
        return {
            error: 400
        }
    }
    const user = { id, username, room }
    users.push(user)
  
    return { user }
}
const removeUser = (id) => {
  
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
const getUser = (id) => {
    const user = users.find((user) => {
        return user.id === id
    })

    return user
}

const getUsersInRoom = (room) => {
    const userInRoom = users.filter((user) => {
        return user.room === room
    })
    return userInRoom
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}