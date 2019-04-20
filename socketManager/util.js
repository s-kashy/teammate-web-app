var moment =require("moment")

const generateMessage = (username, text) => {
    return {
        name:username,
        message:text,
        date:moment(Date.now()).format("HH:mm DD-MM-YYYY")
    }
}

module.exports = {
    generateMessage,
 
}