import React, { Component } from "react";
import "./LandingPage.css";
import { connect } from "react-redux";
import Table from "../UserTable/UserTable";
import * as actionType from "../../Store/actions/index";
import Banner from "../../Component/Banner/Banner";
import AdminComercial from "../../Component/Commercial/AdminComercial";

class LadingPage extends Component {
  state = {
    userCalender: []
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successFunction,
        this.errorFunction
      );
    } else {
      alert(
        "It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it."
      );
    }
  }
  shouldComponentUpdate() {
    return this.props.emailRegister !== null;
  }
  successFunction = position => {
    this.props.setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  };
  errorFunction = err => {
    this.props.openErrorMsg();
  };

  render() {
    return (
      <div className="wrapper-landing-page">
        <div>
          <Banner />
        </div>
        <div className="mid-Landing-page">
          <div className="child-mid-landing-page">
            <Table data={this.props.userCalender} />
          </div>
          <div className="vl"></div>
          <div className="child-mid-landing-page">
          <p className="advertisement-title-landing-page">*advertisement</p>
            <AdminComercial />
          </div>
        
        </div>
      </div>
    );
  }
}

const mapStateHandler = state => {
  return {
    emailRegister: state.user.email,
    userCalender: state.teamCreateInfo.userCalender
  };
};
const mapStateDispatch = dispatch => {
  return {
    setLocation: loc => dispatch(actionType.setLocationUser(loc)),
    openErrorMsg: () => dispatch(actionType.openErrorMsg()),
    getUserCalender: email => dispatch(actionType.getUserCalender(email))
  };
};
export default connect(
  mapStateHandler,
  mapStateDispatch
)(LadingPage);
