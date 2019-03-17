
const mongoose = require("mongoose")
var Profile = mongoose.model("Profile")

module.exports = (req, res, next) => {

  const { imageUrl, email } = JSON.parse(req.body.value)
  let parseUpdate = JSON.parse(req.body.value)
  let id = req.header("id")
  if (imageUrl.includes("http")) {
    Profile.findOneAndUpdate(id,
      { $set: parseUpdate }, { new: true }).then(docs => {
        res.status(200).send(docs)
      }).catch(err => {
        res.status(400).send("err")
      })
  }else{
    next()
  }



}