const mongoose = require("mongoose")
const User = mongoose.model("User")
module.exports= (req, res, next) => {

    let token = req.headers.auth

    User.findByToken(token).then(user => {
        if (!user) {
            return Promise.reject()
        } else {
            req.user=user
            req.token=token
            next()
        }
    }).catch(e => {
        res.status(400).send(e)
    })
}