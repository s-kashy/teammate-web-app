const mongoose = require("mongoose")
const { Schema } = mongoose

const chatTeam = new Schema({
    teamId: { type: String ,required:true },
    teamMessages:[{date:{type:String},name:{type:String},message:{type:String}}]
})
mongoose.model("ChatTeam", chatTeam)