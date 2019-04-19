import React, { Component } from "react"
import "./TeamManagerCard.css"
import { connect } from "react-redux"
import moment from "moment"
import Spinner from "../../../Component/Ui/Spinner/Spinner"
import * as actionType from "../../../Store/actions/index"
import { withRouter } from "react-router-dom";
var Previous = "Previous"
var Submit = "Submit"
class TeamManagerCard extends Component {
    state = {
        image: "",
        isLoading: false

    }

    componentDidMount() {

        if (this.props.generalInfo.file) {
            if (typeof (this.props.generalInfo.file) === 'string') {
                this.setState({ image: this.props.generalInfo.file, isLoading: true })
            }
            else {
                this.setState({ image: URL.createObjectURL(this.props.generalInfo.file), isLoading: true })
            }
        } else {
            this.setState({ isLoading: true })
        }
    }
    onClickHandler = () => {
        var data = {
            location: this.props.location,
            generalInfo: this.props.generalInfo,
            dateAndTime: this.props.dateAndTime,
            emailManger: this.props.emailManger
        }
        if (this.props.generalInfo.file) {
            var formDate = new FormData()
            formDate.append("myImage", this.props.generalInfo.file)
            formDate.append("value", JSON.stringify(data))
            this.props.processRequestMsg(true)
           
            this.props.submitManagerCard(formDate, this.props.email).then(res => {
                if (res.status == 200) {
                    setTimeout(() => {
                        this.props.history.push("/")
                        this.props.processRequestMsg(false)
                        this.props.clearAllTeams()
                    }, 1000);

                }
            }).catch(err => {
                console.log("manager err", err)
            })
        }

    }
    render() {

        const { nameOfTeam, aboutTheTeamChosen, typeOfSportChosen } = this.props.generalInfo
        const { startTime, endTime, pickType, dayOfTheWeekPicker, selectedDays } = this.props.dateAndTime

        const { formattedAddress } = this.props.location
        var arrayOfTheDates = []
        var month = []
        if (dayOfTheWeekPicker !== undefined && dayOfTheWeekPicker.length > 0) {
            arrayOfTheDates = dayOfTheWeekPicker.map((item, index) => {
                return (<li key={index} className="item-date-manager-card">{item.value}</li>)
            })
        }

        if (selectedDays !== undefined && selectedDays.length > 0) {
            console.log("monthly", selectedDays)
            arrayOfTheDates = selectedDays.map((item, index) => {
                return (<li key={index} className="item-date-manager-card">{moment(item).format('DD/MM/YYYY')}</li>)
            })
        }
        return (<div>{this.state.isLoading ? <div className="main-team-manager-card">
            <div className="top-image-team-manager-card">
                <img src={this.state.image} className="img-card-view" alt="profile-image-manager" />
            </div>
            <div className="bottom-contact-team-manager-card">
                <div className="title-card-manager">
                    <h1 style={{ marginBottom: "10px", textTransform: "uppercase" }}>{nameOfTeam}</h1>
                    <span style={{ color: "#3498db" }}><strong>Type of Sport:</strong></span><span>{typeOfSportChosen}</span>
                </div>
                <div className="about-card-manager">
                    <p style={{ margin: "0" }}>About The Team</p>
                    <article className="about-team-card-manager">
                        {aboutTheTeamChosen}
                    </article>
                </div>
                <div className="location-card-manager">
                    <span ><i className="fas fa-thumbtack"></i></span> <span><span style={{ color: '#3498db' }}> Meetup is At</span> {formattedAddress}</span>
                </div>
                <div className="time-date-wrapper-manager-card">
                    <div className="type-of-meetup">
                        <span style={{ color: "#3498db" }}>When Do We Meet </span><span>{pickType}</span>
                    </div>
                    <div className="start-end-time-manager-card">
                        <span><i className="fas fa-clock"></i></span><span style={{ color: "#3498db", paddingLeft: "2px" }}>Start Time is</span><span> {startTime}</span>
                        <span><i className="fas fa-clock"></i></span><span style={{ color: "#3498db" }}> End Time is</span><span> {endTime}</span>
                    </div>
                    <div className="dates-card-manager">
                        <ul className="list-of-dates-manager-card">
                            {arrayOfTheDates}
                        </ul>
                    </div>
                    <div className="btn-contral-manager-card">
                        <button className="btn-previous-card-manager" onClick={this.props.leftClick}>{this.props.cancel != undefined ? this.props.cancel : Previous.toString()}</button>
                        <button className="btn-submit-manager-card" onClick={typeof (this.props.joinTeamHandler) === 'function' ? this.props.joinTeamHandler : this.onClickHandler}>{this.props.join != undefined ? this.props.join : Submit.toString()}</button>
                    </div>
                </div>

            </div>

        </div> : <Spinner />}</div>)
    }
}




const mapStateHandler = state => {
    return {
        email: state.user.email,
        location: state.teamCreateInfo.location,
        generalInfo: state.teamCreateInfo.generalInfo,
        dateAndTime: state.teamCreateInfo.dateAndTime,
        emailManger: state.teamCreateInfo.emailManger,
    };
};
const mapStateDispatch = dispatch => {
    return {
        clearAllTeams: () => dispatch(actionType.clearAllTeams()),
        submitManagerCard: (mangerCard, email) => dispatch(actionType.submitManagerCard(mangerCard, email)),
        processRequestMsg: (req) => dispatch(actionType.processRequestMsg(req)),

    };
};
export default withRouter(connect(mapStateHandler, mapStateDispatch)(TeamManagerCard))