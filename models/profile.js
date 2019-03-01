const mongoose = require("mongoose")
const { Schema } = mongoose


const profile = new Schema({
    email: { type: String, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    about: { type: String, trim: true },
    sportInterest: [
        { value: Boolean, nameOfSport: String, _id: false },

    ],
    age:  String ,
    imageUrl:  String ,
    date: { type: Date, default: Date.now }

})
profile.statics.findUser = function (email) {
    var User = this
    return User.findOne({ email: email }).then(user => {
        return Promise.resolve(user)
    })

}


mongoose.model("Profile", profile)