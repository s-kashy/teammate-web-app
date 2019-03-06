import React, { Component } from "react"
import IntroStep from "./IntroStep/IntroStep"
import GeneralInfo from "./GeneralInfo/GeneralInfo"
import ContralTeamCreate from "./ContralTeamCreate/ContralTeamCreate"
import DateAndTime from "./DateAndTime/DateAndTime"
import Map from "./Map/Map"

import "./TeamCreator.css"
class TeamCreator extends Component {

    state = {
        indexActive: 3
    }

    onClickLeft = () => {
        const nextIndex = this.state.indexActive-1< 0 ? this.state.indexActive: this.state.indexActive - 1;
        this.setState({ indexActive: nextIndex });
      }
      onClickRight = () => {
        const nextIndex = this.state.indexActive+1 > 7 ?  this.state.indexActive :this.state.indexActive + 1;
        this.setState({ indexActive: nextIndex });
      }
    render() {
        const { indexActive } = this.state
        return (<div className="main-create-team">
            {indexActive === 0 ? <IntroStep click={this.onClickRight} /> : null}
            {indexActive===1?<GeneralInfo rightClick={this.onClickRight} leftClick={this.onClickLeft}/>:null}
            {indexActive===2?<DateAndTime rightClick={this.onClickRight} leftClick={this.onClickLeft}/>:null}
            {indexActive===3?<Map rightClick={this.onClickRight} leftClick={this.onClickLeft}/>:null}
            <div>
               
            </div>
        </div>)
    }

}
export default TeamCreator