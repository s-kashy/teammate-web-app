const mongoose = require("mongoose")
var ChatTeam = mongoose.model("ChatTeam")

module.exports = (app) => {

    app.post("/api/chat-message/post-message", (req, res) => {
        let id = req.headers.id
        ChatTeam.findOneAndUpdate({ _id: id }, { $push: { chatTeam: req.body.message } }, { new: true }).then(docs => {
            res.send(docs)
        }).catch(err => {
            res.send(err)
        })
    })
    app.get("/api/chat-message/get-messages", (req, res) => {
        let id = req.headers.id
        ChatTeam.findOne({ teamId: id }).then(docs => {
            res.send(JSON.stringify(docs))
        }).catch(err => {
            res.send(err)
        })
    })

}