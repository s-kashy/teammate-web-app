import React from "react"
import "./TeamInfo.css"
import moment from "moment"
const TeamInfo = (props) => {
    let timesArray = (<li>Every Day</li>)
    if (props.teamSelected.dateAndTime.dayOfTheWeekPicker.length) {
        timesArray = props.teamSelected.dateAndTime.dayOfTheWeekPicker.map(day => {
            return (<li>{day.value}</li>)
        })
    }
    else if (props.teamSelected.dateAndTime.selectedDays.length) {
        timesArray = props.teamSelected.dateAndTime.selectedDays.map(date => {
            return <li>{moment(date).format("DD-MM-YYYY").toString()}</li>
        })
    }
    return (<div className="wrapper-team-info">
        <p className="team-name-chat-board">{props.teamSelected.generalInfo.nameOfTeam}</p>
        <p className="sub-messages-team-info">{props.teamSelected.generalInfo.typeOfSportChosen}</p>
        <hr />

        <p className="sub-messages-team-info about" >{props.teamSelected.generalInfo.aboutTheTeamChosen}</p>
        <hr />
        <p className="sub-messages-team-info times-wrapper-team-info">
            <span className="times-info-team">Start {props.teamSelected.dateAndTime.startTime}</span>
            <span className="times-info-team">Ends {props.teamSelected.dateAndTime.endTime}</span></p>
        <p className="sub-messages-team-info" style={{ textDecoration: "underline" }}>We meet on a {props.teamSelected.dateAndTime.pickType} bases</p>
        <ul className="array-of-time-team-info">
            {timesArray}
        </ul>
        <p className="sub-messages-team-info">We hope To See You Soon!!!</p>
    </div>)
}

export default TeamInfo