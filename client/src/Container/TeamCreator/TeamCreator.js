import React, { Component } from "react"
import IntroStep from "./IntroStep/IntroStep"
import GeneralInfo from "./GeneralInfo/GeneralInfo"
import ContralTeamCreate from "./ContralTeamCreate/ContralTeamCreate"
import DateAndTime from "./DateAndTime/DateAndTime"
import MapSearchLayout from "./Map/MapSearchLayout/MapSearchLayout"
import "./TeamCreator.css"
class TeamCreator extends Component {
   constructor(props){
       super(props)
       this.state = {
        indexActive: 3
    }
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
        if(indexActive===0){
            return(<div><IntroStep rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
        }
        if(indexActive===1){
            return(<div><GeneralInfo  rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
        }
        if(indexActive===2){
            return(<div><DateAndTime rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
        }
        if(indexActive===3){
            return(<div><MapSearchLayout rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
        }
     
               
        
    }

}
export default TeamCreator