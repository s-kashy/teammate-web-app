
const mongoose = require("mongoose")
var Team = mongoose.model("Team")
var keys = require("../config/keys")

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
        console.log(data)
        let team = new Team(data)
        if (req.file) {
            team.generalInfo.file = req.file.url
        }

        team.save().then(user => {
            res.send(user)
        }).catch(err => {
            res.send(err)
        })
    })

    app.get("/api/team/find-by-categories", (req, res) => {

        console.log("get",req.body)
        res.send()
        // Team.find({}).then(teams => {
        //     let result = teams.filter(team => {
        //         return arraySearchBy.includes(team.generalInfo.typeOfSportChosen)
        //     })
        //     console.log("res server",result)
        //     res.header("len", result.length.toString()).send(result)
        // }).catch(err => {
        //     res.send(err)
        // })
    })
}