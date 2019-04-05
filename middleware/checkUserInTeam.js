const mongoose = require("mongoose")
var Team = mongoose.model("Team")

module.exports = (req, res, next) => {
    let id = req.headers.id
    var userEmail = req.body.userEmail
    Team.findById(id).then(teams => {
        if (teams.membersId.length === 0) {
            next()
        } else {
            let result = teams.membersId.find(item => {
                return item === userEmail
            })
            if (result === undefined) {
                next()
            } else {
                res.status(201).send()
            }
        }

    })


}
