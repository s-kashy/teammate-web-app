const mongoose = require("mongoose")
const { Schema } = mongoose

const chatTeam = new Schema({
    teamId: { type: String ,required:true },
    chatTeam:[{date:{type:Date,default:Date.now},name:{type:String},message:{type:String}}]
})
mongoose.model("ChatTeam", chatTeam)