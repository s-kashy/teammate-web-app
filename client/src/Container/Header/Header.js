import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index";
import "./Header.css";

class Header extends Component {
  state = {
    open: true
  };
  onclickSearchTeamHandler = () => {
    this.props.clearAllTeams();
    this.onClickMenu();
  };
  onClickYourTeamHandler = () => {
    this.props.clearSearchTeamArray();
    this.props.history.push("/your-teams");
    this.onClickMenu();
  };
  onClickLogout = () => {
    this.setState({ open: !this.state.open });
    this.props
      .logoutUser()
      .then(res => {})
      .catch(err => {});
  };
  onClickMenu = () => {
    this.setState({ open: !this.state.open });
  };
  createTeamHandler = () => {
    this.props.clearStepsCreateTeam();
    this.props.history.push("/create-team");
    this.onClickMenu();
  };
  render() {
    let menuState = this.state.open ? "-100%" : "0";
    return (
      <div className="header">
        <Link to="/">
          <h2 className="header-logo" onClick={this.onClickMenu}>
            TeamMate
          </h2>
        </Link>

        <label
          htmlFor="chk-header"
          className="show-menu-btn"
          onClick={this.onClickMenu}
        >
          <span className="x-header">
          
            <i className="fas fa-times" />
          </span>
        </label>
        <ul className="menu" style={{ right: menuState }}>
          <NavLink
            onClick={this.onclickSearchTeamHandler}
            className="link-class"
            to="/search-team"
          >
            Search Team
          </NavLink>
          <NavLink
            to="#"
            onClick={this.onClickYourTeamHandler}
            className="link-class"
          >
            Your Teams
          </NavLink>
          <NavLink
            onClick={this.onClickMenu}
            className="link-class"
            to="/profile"
          >
            Your Profile
          </NavLink>
          <NavLink
            onClick={this.createTeamHandler}
            className="link-class"
            to="#"
          >
            Create A Team
          </NavLink>
          <NavLink
            onClick={this.onClickMenu}
            className="link-class"
            to="/contact-us"
          >
            Contact us
          </NavLink>
          <NavLink
            onClick={this.onClickMenu}
            className="link-class"
            exact
            to="/about"
          >
            About
          </NavLink>
          <NavLink onClick={this.onClickLogout} className="link-class" to="#">
            logout
          </NavLink>
          <label
            htmlFor="chk"
            className="hide-menu-btn"
            onClick={this.onClickMenu}
          >
            <i className="fas fa-times" />
          </label>
        </ul>
      </div>
    );
  }
}
const mapStateHandler = state => {
  return {
    auth: state.auth.isAuthenticate
  };
};
const mapStateDispatch = dispatch => {
  return {
    clearAllTeams: () => dispatch(actionType.clearAllTeams()),
    logoutUser: () => dispatch(actionType.logoutUser()),
    clearSearchTeamArray: () => dispatch(actionType.clearSearchTeamArray()),
    clearStepsCreateTeam:()=>dispatch(actionType.clearStepsCreateTeam())
  };
};
export default withRouter(
  connect(
    mapStateHandler,
    mapStateDispatch
  )(Header)
);
