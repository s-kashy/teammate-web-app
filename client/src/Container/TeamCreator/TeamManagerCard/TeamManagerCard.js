import React, { Component } from "react"
import "./TeamManagerCard.css"
import { connect } from "react-redux"
import * as actionType from "../../../Store/actions/index"
class TeamManagerCard extends Component {

    render() {
        return (<div className="main-team-manager-card">
            <div className="basic-info-team-manager-card">
                <h2>Person name</h2>
                <p style={{ margin: "0" }}>team manger</p>
            </div>
            <div className="image-team-manager-card">
                <img src="https://res.cloudinary.com/diyrxbb9o/image/upload/v1553006690/action-beach-fun-416676.jpg" />
            </div>

            <div className="about-the-team-card-manager">
                <p style={{ margin: "0" }}>About the Team</p>
                <article>ce the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type
                but also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with
                 the release of Letraset sheets containing Lorem
    Ipsum passages, and more recently with desktop</article>
            </div>
                <div className="time-date-team-manager-card">
                <p>Meet is Daily</p>
                <ul>
                    <li></li>
                </ul>
                </div>
        </div>)
    }
}
const mapStateHandler = state => {
    return {
        location: state.teamCreateInfo.location,
    };
};
const mapStateDispatch = dispatch => {
    return {
        saveLocation: (location) => dispatch(actionType.saveLocation(location)),


    };
};
export default connect(mapStateHandler, mapStateDispatch)(TeamManagerCard)