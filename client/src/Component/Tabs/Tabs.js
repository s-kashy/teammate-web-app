import React, { Component } from "react"
import { connect } from "react-redux"
import * as actionType from "../../Store/actions/index"
import { Link, withRouter } from "react-router-dom"
import "./Tabs.css"

class Tabs extends Component {
    state = {
        toggleClass: false
    }
    onClickTabMobileHandler = () => {
        this.setState({ toggleClass: !this.state.toggleClass })
    }
    onClickYourTeamHandler = () => {
        this.props.clearAllTeams()
        this.props.history.push("/your-teams")
    }
    render() {
        return (
            <div className="main-wrapper-tabs">
                <div className="tabs tabs-style-linebox">
                    <nav>
                        <ul>
                            <li><Link to="/"><span className="home-tab"></span></Link></li>
                            <li><Link to="/search-team"><span className="search-teams-tab"></span></Link></li>
                            <li onClick={this.onClickYourTeamHandler}><Link to="#" ><span className="your-teams-tab"></span></Link></li>
                        </ul>
                    </nav>
                </div>
                <div className={this.state.toggleClass ? "mobile-tabs-open" : "mobile-tabs"}>
                    <nav>
                        <ul>
                            <li><Link to="/"><span className="home-tab"></span></Link></li>
                            <li><Link to="/search-team"><span className="search-teams-tab"></span></Link></li>
                            <li onClick={this.onClickYourTeamHandler}><Link to="#"><span className="your-teams-tab"></span></Link></li>
                        </ul>
                    </nav>

                </div>
                <div style={{ position: "relative" }}>
                    <button className={this.state.toggleClass ? "btn-tab-mobile" : "btnc"} onClick={this.onClickTabMobileHandler}></button>
                </div>
            </div>
        )
    }
}

const mapDispatchHandler = dispatch => {
    return {
        clearAllTeams: () => dispatch(actionType.clearAllTeams())
    }
}
export default withRouter(connect(null, mapDispatchHandler)(Tabs))