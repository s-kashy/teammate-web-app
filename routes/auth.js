const mongoose = require("mongoose")
var User = mongoose.model("User")
var authenticate = require("../middleware/authenticate")

module.exports = (app) => {
    app.post("/api/auth/sign-in", (req, res) => {
        console.log("post new user")
        res.send({ res: "Sadsasds" })
        // var user = new User(req.body)
        // user.save().then(() => {
        //     return user.generateAuthToken()
        // }).then(token => {
        //     res.header('x-auth', token).send(user)
        // }, (err => {
        //     res.status(400).send(err)
        // }))

    })

    app.get("/api/auth/login-check", (req, res) => {
        console.log("get")
        res.send("get check login")
        // let token = req.header("x-auth")
        // User.findByToken(token).then(user => {
        //     if (!user) {
        //         return Promise.reject()
        //     } else {
        //         res.send(req.user)
        //     }
        // }).catch(e => {
        //     res.status(400).send("Not valid")
        // })
    })
    app.post("/api/auth-login-with-credential", (req, res) => {
        const { email, password } = req.body
        User.findByCredential(email, password).then(user => {
            return user.generateAuthToken().then((token) => {
                res.header("x-auth", token).send(user)
            })
        }).catch(err => {
            res.status(400).send()
        })

        app.delete("/api/auth/logout", authenticate, (req, res) => {

            console.log("dele")
            // req.user.removeToken(req.token).then(() => {
            //     res.status(200).send()
            // }, () => {
            //     res.status(400).send()
            // }).catch(err => {
            //     res.status(400).send()
            // })
        })
    })

}