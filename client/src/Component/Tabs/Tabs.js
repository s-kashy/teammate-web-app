import React, { Component } from "react"
import { NavLink, withRouter } from "react-router-dom"
import "./Tabs.css"

class Tabs extends Component {

    render() {

        return (
            <div className="container">
                <nav className="wrapper-li-tabs">
                    <NavLink className="link-tab" to="/"><span><i className="fas fa-home"></i></span>Home</NavLink>
                    <NavLink className="link-tab" to="/search-team"><span><i className="fas fa-search"></i></span>Search</NavLink>
                </nav>

            </div>

        )
    }
}
export default withRouter(Tabs)