const mongoose = require("mongoose")
var ChatTeam = mongoose.model("ChatTeam")

module.exports = (app) => {

    app.post("/api/chat-message/post-message", (req, res) => {
        const id = req.body.headers
        ChatTeam.findOneAndUpdate({ _id: id }, { $push: { chatTeam: req.body.message } }, { new: true }).then(docs => {
            res.send(docs)
        }).catch(err => {
            res.send(err)
        })
    })
    app.get("/api/chat-message/get-messages", (req, res) => {
        const id = req.body.headers
        ChatTeam.findById(id).then(docs => {
            res.send(JSON.stringify(docs))
        }).catch(err => {
            res.send(err)
        })
    })

}