import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "./Tabs.css"

class Tabs extends Component {

    render() {
        return (
            <div className="tabs tabs-style-linebox">
            <nav>
                <ul>
                    <li><Link to="/"><span className="home-tab">Home</span></Link></li>
                    <li><Link to= "/search-team"><span className="search-teams-tab">Search for Team</span></Link></li>
                    <li><Link to= "/chat-board"><span className="your-teams-tab">Your Teams</span></Link></li>
               
                </ul>
            </nav>
            </div>

        )
    }
}
export default withRouter(Tabs)