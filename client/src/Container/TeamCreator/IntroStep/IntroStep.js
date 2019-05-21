import React from "react"
import "./IntroStep.css"

const IntroStep = (props) => {

    return (<div className="intro-wrapper">
    <div className="intro-create-team" >
        <h3>Create and Manage Your Team</h3>
        <div className="msg-intro-create">
            <p>You can start and manage your team in a few easy steps: </p>
            <p className="pointer-intro">Identify the sport, team name and logo, number of players</p>
            <p className="pointer-intro">Post the schedule</p>
            <p className="pointer-intro">Post the Location</p>
            <p className="pointer-intro">Confirm your email (one time)</p>
 
            <p>When done, you’ll receive email alerts  every time your friends
             and others who are searching for a team sign up . As your team forms 
             and plays, it will be easy for Teammates to communicate on the app’s
              group chat. </p>
        </div>
        <div className="btn-wrapper-intro">
            <button onClick={props.rightClick} className="next-btn-intro">Create Your Team Now<span className="icon-start-intro"><i className="fas fa-arrow-right"></i></span></button>
        </div>
    </div>
    </div>)
}
export default IntroStep