import React, { Component } from 'react';
import { NavLink, Link, withRouter } from "react-router-dom"
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index"
import "./Header.css"

class Header extends Component {
    state = {
        open: true
    }
    onclickSearchTeamHandler = () => {
        this.props.clearAllTeams()
        this.onClickMenu()
    }
    onClickYourTeamHandler = () => {
        this.props.clearAllTeams()
        this.props.history.push("/your-teams")
        this.onClickMenu()
    }
    onClickLogout = () => {
        this.props.logoutUser().then(res => {

        }).catch(err => { })
    }
    onClickMenu = () => {
        this.setState({ open: !this.state.open })

    }
    createTeamHandler = () => {
        this.props.clearAllTeams()
        this.props.history.push("/create-team")
        this.onClickMenu()
    }
    render() {
        let menuState = this.state.open ? "-100%" : "0"
        return (<div className="header">
            <Link to="/"><h2 className="header-logo" onClick={this.onClickMenu}>TeamMate</h2></Link>
            {/* <input type="checkbox" className="chk" id="chk-header" /> */}
            <label htmlFor="chk-header" className="show-menu-btn" onClick={this.onClickMenu}>
            <span className="x-header"> <i className="fas fa-times"></i></span>  
            </label>
            <ul className="menu" style={{ right: menuState }}>

                <NavLink onClick={this.onclickSearchTeamHandler} className="link-class" to="/search-team">Search Team</NavLink>
                <NavLink to="#" onClick={this.onClickYourTeamHandler} className="link-class" >Your Teams</NavLink>
                <NavLink onClick={this.onClickMenu} className="link-class" to="/profile" onClick={this.onClickMenu}>Your Profile</NavLink>
                <NavLink onClick={this.createTeamHandler} className="link-class" to="#" >Create A Team</NavLink>
                <NavLink onClick={this.onClickMenu} className="link-class" exact to="/about">About</NavLink>
                <NavLink onClick={this.onClickMenu} className="link-class" to="#" onClick={this.onClickLogout}>logout</NavLink>
                <label htmlFor="chk" className="hide-menu-btn" onClick={this.onClickMenu}>
                    <i className="fas fa-times"></i>
                </label>
            </ul>
        </div>)


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
        logoutUser: () => dispatch(actionType.logoutUser())
    };
};
export default withRouter(connect(mapStateHandler, mapStateDispatch)(Header))