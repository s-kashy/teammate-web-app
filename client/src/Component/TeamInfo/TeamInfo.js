import React,{Component} from "react"
import "./TeamInfo.css"
import moment from "moment"
import RatingBar from "../../Container/RatingBar/RatingBar"
class TeamInfo extends Component {
    render(){
    let timesArray = (<li>Every Day</li>)
    if (this.props.teamSelected.dateAndTime.dayOfTheWeekPicker.length) {
        timesArray = this.props.teamSelected.dateAndTime.dayOfTheWeekPicker.map((day,index)=> {
            return (<li key={index}>{day.value}</li>)
        })
    }
    else if (this.props.teamSelected.dateAndTime.selectedDays.length) {
        timesArray = this.props.teamSelected.dateAndTime.selectedDays.map(date => {
            return <li>{moment(date).format("DD-MM-YYYY").toString()}</li>
        })
    }
    
    return (<div className="wrapper-team-info">
    <span onClick={this.props.click} className="go-back-icon-mobile-info-team"><i className="fas fa-arrow-left"></i></span>
        <p className="team-name-chat-board">{this.props.teamSelected.generalInfo.nameOfTeam}</p>
        <p className="sub-messages-team-info">{this.props.teamSelected.generalInfo.typeOfSportChosen}</p>
        <hr />
        <p className="sub-messages-team-info about" >{this.props.teamSelected.generalInfo.aboutTheTeamChosen}</p>
        <hr />
        <p className="sub-messages-team-info times-wrapper-team-info">
            <span className="times-info-team">Start {this.props.teamSelected.dateAndTime.startTime}</span>
            <span className="times-info-team">Ends {this.props.teamSelected.dateAndTime.endTime}</span></p>
        <p className="sub-messages-team-info" style={{ textDecoration: "underline" }}>We meet on a {this.props.teamSelected.dateAndTime.pickType} basis</p>
        <ul className="array-of-time-team-info">
            {timesArray}
        </ul>
        <RatingBar title={this.props.edit ?"Rate Your Team" :"Your Rating"} rate={this.props.rate} classRating={this.props.edit ?"rating-wrapper-inputs":"rating-wrapper-inputs-disable"} edit={this.props.edit} clickRating={this.props.clickRating}/>
        <p className="sub-messages-team-info">We hope To See You Soon!!!</p>
    </div>)}
}

export default TeamInfo