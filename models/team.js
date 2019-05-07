const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    marker: [
      {
        lat: Number,
        lng: Number,
        title: String
      }
    ]
  },
  rateTeam: {
    total: { type: Number, default: 0 },
    voters: [String],
    rate: { type: Number, default: 0 }
  },
  emailManger: String,
  membersId: [String]
});
team.methods.updateRate = function(total, numOfVoters) {
  var team = this;
  team.rateTeam.rate = total / numOfVoters;
  return team
    .save()
    .then(team => {
      return Promise.resolve(team);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
mongoose.model("Team", team);
