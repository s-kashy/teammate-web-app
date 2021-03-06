const mongoose = require("mongoose");
const { Schema } = mongoose;
const uuid = require('uuidv4');

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
team.statics.createUserCalender = function(userEmail) {
  let Team = this;
  return Team.find({ membersId: userEmail }).then(teams => {
    if (teams == undefined || teams.length === 0) {
      return Promise.resolve([]);
    } else {
      return new Promise((resolve, reject) => {
        var scheduleArray = [];
        for (let i = 0; i < teams.length; i++) {
         
          if (teams[i].dateAndTime.pickType==="Daily") {
            scheduleArray.push({
              nameOfTeam: teams[i].generalInfo.nameOfTeam,
              location: teams[i].location.formattedAddress,
              sport: teams[i].generalInfo.typeOfSportChosen,
              times: ["Daily"],
              typeSchedule:teams[i].dateAndTime.pickType,
              key:uuid()
            });
          } else if (teams[i].dateAndTime.selectedDays.length > 0) {
            scheduleArray.push({
              nameOfTeam: teams[i].generalInfo.nameOfTeam,
              location: teams[i].location.formattedAddress,
              sport: teams[i].generalInfo.typeOfSportChosen,
              times: teams[i].dateAndTime.selectedDays,
              typeSchedule:teams[i].dateAndTime.pickType,
              key:uuid()
            });
          } else {
            scheduleArray.push({
              nameOfTeam: teams[i].generalInfo.nameOfTeam,
              location: teams[i].location.formattedAddress,
              sport: teams[i].generalInfo.typeOfSportChosen,
              times: teams[i].dateAndTime.dayOfTheWeekPicker,
              typeSchedule:teams[i].dateAndTime.pickType,
              key:uuid()
            });
          }
        }
        resolve(scheduleArray);
      });
    }
  });
};
mongoose.model("Team", team);
