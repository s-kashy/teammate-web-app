
const mongoose = require("mongoose")
var Team = mongoose.model("Team")
var ChatTeam = mongoose.model("ChatTeam")
var keys = require("../config/keys")
var checkUserInTeam = require("../middleware/checkUserInTeam")

const multer = require("multer");

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

module.exports = (app) => {
    cloudinary.config({
        cloud_name: keys.CLOUDINARY_NAME,
        api_key: keys.CLOUDINARY_API_KEY,
        api_secret: keys.CLOUDINARY_SECRET
    });
    const storage = cloudinaryStorage({
        cloudinary: cloudinary,
        folder: "demo",
        allowedFormats: ["jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
    const parser = multer({ storage: storage });


    app.post("/api/team/new-team", parser.single("myImage"), (req, res) => {
        let data = JSON.parse(req.body.value)
        var team = new Team(data)
        if (req.file) {
            team.generalInfo.file = req.file.url
        }
        var chatTeam = new ChatTeam()
        chatTeam.teamId = team._id

        team.save(function (err, docs) {
            if (err) {
                res.send(err)
            } else {
                chatTeam.save().then(() => {
                    res.send(docs)
                })

            }
        })
    })

    app.post("/api/team/find-by-categories", (req, res) => {
        let arraySearchBy = req.body
        Team.find({}).then(teams => {
            let result = teams.filter(team => {
                return arraySearchBy.includes(team.generalInfo.typeOfSportChosen)
            })
            res.header("len", result.length).send(result)
        }).catch(err => {
            res.send(err)
        })
    })

    app.post("/api/team/join-team", checkUserInTeam, (req, res) => {
        let id = req.headers.id
        Team.findOneAndUpdate({ _id: id }, { $push: { membersId: req.body.userEmail } }, { new: true }).then(docs => {
            res.send(docs)
        }).catch(err => {
            res.send(err)
        })
    })
    app.get("/api/team/get-all-users-teams", (req, res) => {
        let id = req.headers.id
        Team.find({ membersId: id }).then(docs => {
            res.send(docs)
        }).catch(err => {
            res.send(err)
        })

    })
}

