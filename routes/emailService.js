var nodemailer = require('nodemailer');
var randomstring = require("randomstring");
const mongoose = require("mongoose")
var User = mongoose.model("User")
const key = require("../config/keys")

module.exports = (app) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: key.EMAIL_SERVICE,
            pass: key.PASSWORD_EMAIL_SERVICE
        }
    });


    app.post("/api/email/send-token", (req, res) => {

        var randomString = randomstring.generate(7)
        const emailMangerInfo = {
            webToken: randomString,
            emailManger: req.body.emailManger

        }
        const mailOptions = {
            from: 'shlomo.kashy@gmail.com', // sender address
            to: req.body.emailManger.toString(), // list of receivers
            subject: 'TeamMate confirme Email', // Subject line
            text: `Hello please copy paste this => ${randomString} to your input`
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(400).send(err)
            } else {
                User.findOneAndUpdate({ email: req.body.email }, { $set: { emailMangerInfo: emailMangerInfo } }, { new: true }).then(docs => {

                    res.status(200).send(docs)
                }).catch(err => {
                    res.status(400).send(err)
                })

            }
        });
    })
    app.post("/api/email/confirm-token", (req, res) => {

        User.findOne({ email: req.body.email }).then(user => {
            if (user.emailMangerInfo.webToken === req.body.token) {
                user.emailMangerInfo.isManger = true
                user.emailMangerInfo.emailManger = req.body.emailManger
                user.save((err) => {
                    if (err) {
                        res.status(400).send(err)
                    } else {
                        res.status(200).send(user)
                    }
                })
            }

        }).catch(err => {
            res.status(400).send()
        })

    })
}