
const mongoose = require("mongoose")
var Profile = mongoose.model("Profile")


module.exports = (app) => {

    app.post("/api/profile/new-profile", (req, res) => {
        var profile = new Profile(req.body)
        profile.save().then(docs => {
            console.log("post server")
            res.status(200).send(docs)
        }).catch(err => {
            res.status(400).send(err)
        })


    })

    

    app.get("/api/profile/get-profile", (req, res) => {
        let email = req.header("email")
        
    Profile.findOne({email:email},(err,user)=>{
        if(err){
            res.status(400).send()
        }
        res.status(200).send(user)
    })
       
    })

}