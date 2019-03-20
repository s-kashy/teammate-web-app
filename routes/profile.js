
const mongoose = require("mongoose")
var Profile = mongoose.model("Profile")
var keys = require("../config/keys")
const imageMiddleware = require("../middleware/imageMiddleware")
const multer = require("multer");

var checkImageMiddleware = require("../middleware/checkImageMiddleware")
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





    app.post("/api/profile/new-profile", parser.single('myImage'), (req, res) => {
        const image = {};
        image.url = req.file.url;
        image.id = req.file.public_id;
        const newProfile = JSON.parse(req.body.value)
        var profile = new Profile(newProfile)
        if (req.file.url) {
            profile.imageUrl = req.file.url
        }
        profile.save().then(docs => {
            res.status(200).send(docs)
        }).catch(err => {
            res.status(400).send(err)
        })


    })
    app.post("/api/profile/update-profile-no-image", (req, res) => {
        let id = req.header("id")
        Profile.findOneAndUpdate(id, { $set: req.body }, { new: true }).then(docs => {
            res.status(200).send(docs)
        }).catch(err => {
            res.status(400).send(err)
        })
    })
    app.post("/api/profile/new-profile-no-image", (req, res) => {
        let profile = new Profile();
        profile.save(req.body).then(docs => {
            res.status(200).send(docs)
        }).catch(err => {
            res.status(400).send(err)
        })

    })
    app.post("/api/profile/update-profile", parser.single('myImage'), imageMiddleware, (req, res) => {

        let id = req.header("id")

        Profile.findOneAndUpdate(id,
            { $set: req.body }, { new: true }).then(docs => {
                res.status(200).send(docs)
            }).catch(err => {
                res.status(400).send("err")
            })

    })
    app.get("/api/profile/get-profile", (req, res) => {
        let email = req.header("email")

        Profile.findOne({ email: email }, (err, user) => {
            if (err) {
                res.status(400).send()
            }
            res.status(200).send(user)
        })

    })

}