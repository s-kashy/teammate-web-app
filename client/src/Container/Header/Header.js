import React, { Component } from 'react';
import { NavLink ,Link} from "react-router-dom"
import "./Header.css"

class Header extends Component {
    state = {
        open: true
    }
    onClickMenu = () => {
        this.setState({ open: !this.state.open })
    }
    render() {
        let menuState = this.state.open ? "-100%" : "0"


        return (<div className="header">
        <Link to="/"><h2 className="logo" onClick={this.onClickMenu}>TeamMate</h2></Link>
            <input type="checkbox" className="chk" />
            <label htmlFor="chk" className="show-menu-btn" onClick={this.onClickMenu}>
                <i className="fas fa-times"></i>
            </label>
           
            <ul className="menu" style={{ right: menuState }}>
                <NavLink className="link-class" onClick={this.onClickMenu} exact to="/">About</NavLink>
                <NavLink className="link-class" to="/profile" onClick={this.onClickMenu}>my-Profile</NavLink>
                <NavLink className="link-class" to="/about" onClick={this.onClickMenu}>teams</NavLink>
                <NavLink className="link-class" to="/item" onClick={this.onClickMenu}>logout</NavLink>
                <label htmlFor="chk" className="hide-menu-btn" onClick={this.onClickMenu}>
                    <i className="fas fa-times"></i>
                </label>
            </ul>
            </div>)


    }
}
export default Header