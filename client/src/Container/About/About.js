import React, { Component } from "react";
import "./About.css";
class About extends Component {
  onClickHandler = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="main-wrapper-about">
        <div className="info-about">
          <h2 className="title-about">TeamMate</h2>
          <article className="article-about">
            Teammate is a fun way to find and create pick up games through
            various sports. Do you need a 4th for your tennis doubles game? A
            companion to share your weekly 3 km jog? A player suddenly doesn't
            feel well just before your basketball evening and you need to find
            someone fast? Want to have organize a regular soccer meet up but
            you're missing some players? TeamMate is here for you! Play with
            your friends, create new groups, expand your circle of teammates.
            It's super quick, easy to use, and free! Just register with an email
            address, choose a password, state your location, sports preference,
            and you're good to go. You'll get immediate notifications of
            activities you could join. Teammate connects you to all the sports
            activities you could participate in around you, as well as sport
            buddies for your own activities. What are you waiting for?
          </article>
          <div className="btn-position-about">
            <button className="btn-about" onClick={this.onClickHandler}>
            
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
