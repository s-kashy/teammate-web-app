import React, { Component } from "react";
import "./LandingPage.css";
import { connect } from "react-redux";
import Table from "../UserTable/UserTable";
import * as actionType from "../../Store/actions/index";
import Banner from "../../Component/Banner/Banner";

import SaleCommercial from "../../Component/Commercial/SaleCommercial/SaleCommercial";
import AdminCommercial from "../../Component/Commercial/AdminComercial";
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
      return
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
          <div className="vl" />
          <div>  <p className="advertisement-title-landing-page">*advertisement</p></div>
          <div
            className="wrapper-add-landing-page"
          >   
                <SaleCommercial />
                  <AdminCommercial />
         
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
