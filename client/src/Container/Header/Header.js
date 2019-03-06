import React, { Component } from 'react';
import { NavLink ,Link} from "react-router-dom"
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index"
import "./Header.css"

class Header extends Component {
    state = {
        open: true
    }
    onClickLogout=()=>{
       this.props.logoutUser().then(res=>{
            console.log("rea header",res)
        }).catch(err=>{})
    }
    onClickMenu = () => {
        this.setState({ open: !this.state.open })
    }
    render() {
        let menuState = this.state.open ? "-100%" : "0"


        return (<div className="header">
        <Link to="/"><h2 className="header-logo" onClick={this.onClickMenu}>TeamMate</h2></Link>
            {/* <input type="checkbox" className="chk" id="chk-header" /> */}
            <label htmlFor="chk-header" className="show-menu-btn" onClick={this.onClickMenu}>
                <i className="fas fa-times"></i>
            </label>
           
            <ul className="menu" style={{ right: menuState }}>
                <NavLink className="link-class" exact to="/">About</NavLink>
                <NavLink className="link-class" to="/profile" onClick={this.onClickMenu}>my-Profile</NavLink>
                <NavLink className="link-class" to="/create-team" >Create A Team</NavLink>
                <NavLink className="link-class" to="/item" onClick={this.onClickLogout}>logout</NavLink>
                <label htmlFor="chk" className="hide-menu-btn"  onClick={this.onClickMenu}>
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
        logoutUser: () => dispatch(actionType.logoutUser())
    };
};
export default connect(mapStateHandler,mapStateDispatch)(Header)