import React, { Component } from "react"
import "./TeamManagerCard.css"
import { connect } from "react-redux"
import Spinner from "../../../Component/Ui/Spinner/Spinner"
import * as actionType from "../../../Store/actions/index"

class TeamManagerCard extends Component {
    state = {
        image: "",
        isLoading: false

    }

    componentDidMount() {
   
        if (this.props.generalInfo.file) {
       
            this.setState({ image: URL.createObjectURL(this.props.generalInfo.file), isLoading: true })
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
        if (this.props.generalInfo.file){
            var formDate=new FormData()
            formDate.append("myImage",this.props.generalInfo.file)
            formDate.append("value",JSON.stringify(data))

        this.props.submitManagerCard(formDate).then(res => {
              if (res.status == 200) {
                this.props.history.push("/")
            }
        }).catch(err => {
            
        })
    }

    }
    render() {
        const { nameOfTeam, aboutTheTeamChosen, typeOfSportChosen } = this.props.generalInfo
        const{startTime,endTime}=this.props.dateAndTime
        const { formattedAddress } = this.props.location

        return (<div>{this.state.isLoading ? <div className="main-team-manager-card">
            <div className="basic-info-team-manager-card">
                <h2>{nameOfTeam}</h2>
                <p style={{ margin: "0" }}>Name of Team</p>
            </div>
            <div className="image-team-manager-card">
                <img src={this.state.image} />
            </div>

            <div className="about-the-team-card-manager">
                <p style={{ margin: "0" }}>About the Team</p>
                <article>{aboutTheTeamChosen}</article>
            </div>
            <div className="type-location-wrapper-team-card-info">
                <div className="type-of-sport-team-card-info">
                    <p>Sport Type</p><span>{typeOfSportChosen}</span>
                </div>
                <div className="location-team-card-info">
                    <p >location</p><p style={{ color: "black" }} >{formattedAddress}</p>
                </div>
            </div>
            <div className="time-date-team-manager-card">
                <p style={{ marginTop: "10px" }}>Meet Up is <span className="date-type-card-manager-info">Daily</span></p>
                <ul>
                    <li><span style={{ padding: "20px" }}><i className="fas fa-dot-circle"></i>Start Time {startTime}</span><span><i className="fas fa-dot-circle"></i>End Time {endTime}</span></li>

                </ul>

            </div>
            <button className="btn-submit-manager-card" onClick={this.onClickHandler}>Submit</button>
        </div> : <Spinner />}</div>)
    }
}




const mapStateHandler = state => {
    return {
        location: state.teamCreateInfo.location,
        generalInfo: state.teamCreateInfo.generalInfo,
        dateAndTime: state.teamCreateInfo.dateAndTime,
        emailManger: state.teamCreateInfo.emailManger,
    };
};
const mapStateDispatch = dispatch => {
    return {
        submitManagerCard: (mangerCard) => dispatch(actionType.submitManagerCard(mangerCard)),


    };
};
export default connect(mapStateHandler, mapStateDispatch)(TeamManagerCard)