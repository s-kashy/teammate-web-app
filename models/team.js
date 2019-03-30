const mongoose = require("mongoose")
const { Schema } = mongoose

const team = new Schema({
    generalInfo: {
        nameOfTeam: String,
        numberOfTeam: Number,
        fileName: String,
        file: String,
        aboutTheTeamChosen: String,
        typeOfSportChosen: String
    },
    dateAndTime: {
        pickType: String,
        startTime: String,
        endTime: String,
        dayOfTheWeekPicker: [{ value: String, check: Boolean }],
        selectedDays: [{ type: String }]

    },
    location: {
        userLocation: {
            lat: Number,
            lng: Number
        },
        formattedAddress: String,
        marker: [{
            lat: Number,
            lng: Number,
            title: String,
        
        }],

    },
    emailManger: String

})
mongoose.model("Team", team)