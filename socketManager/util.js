var moment =require("moment")

const generateMessage = (username, text) => {
    return {
        name:username,
        msg:text,
        date:moment(Date.now()).format("HH:mm DD-MM-YYYY")
    }
}

module.exports = {
    generateMessage,
 
}