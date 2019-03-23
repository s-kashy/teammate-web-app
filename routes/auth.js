const mongoose = require("mongoose")
var User = mongoose.model("User")
var authenticate = require("../middleware/authenticate")

module.exports = (app) => {

    app.post("/api/auth/sign-in", (req, res) => {

        var user = new User(req.body)
        user.save().then(() => {
            return user.generateAuthToken()
        }).then(token => {
            res.status(200).header('auth', token).send(user)
        }, (err => {

            res.status(400).send(err)
        }))

    })

    app.get("/api/auth/check", (req, res) => {

        let token = req.header("auth")

        User.findByToken(token).then(user => {

            if (!user) {

                return Promise.reject()

            } else {

                res.status(200).send(user.email)
            }
        }).catch(e => {
            res.status(400).send("Not valid")
        })
    })
    app.post("/api/auth/login-with-credential", (req, res) => {
        const { email, password } = req.body

        User.findByCredential(email, password).then(user => {
            return user.generateAuthToken().then((token) => {
                res.status(200).header("auth", token).send(user)
            })
        }).catch(err => {
            res.status(400).send()
        })
    })

    app.delete("/api/auth/logout", authenticate, (req, res) => {

        req.user.removeToken(req.token).then(() => {
            res.status(200).send()
        }, () => {
            res.status(400).send()
        }).catch(err => {
            res.status(400).send()
        })
    })

    app.get("/api/auth/manger-info", (req, res) => {
        User.findOne(req.body.email).then(docs => {
          
            res.status(200).send(docs.emailManger)
        }).catch(err => {
            res.status(400).send()
        })
    })
}