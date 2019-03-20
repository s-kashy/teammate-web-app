import React, { Component } from "react"
import IntroStep from "./IntroStep/IntroStep"
import GeneralInfo from "./GeneralInfo/GeneralInfo"
import DateAndTime from "./DateAndTime/DateAndTime"
import MapSearchLayout from "./Map/MapSearchLayout/MapSearchLayout"
import EmailVerification  from "./EmailVerification/EmailVerification"
import "./TeamCreator.css"
class TeamCreator extends Component {
   constructor(props){
       super(props)
       this.state = {
        indexActive: 4
    }
   }

   

    onClickLeft = () => {
        console.log("click left ")
        const nextIndex = this.state.indexActive-1< 0 ? this.state.indexActive: this.state.indexActive - 1;
        this.setState({ indexActive: nextIndex });
      }
      onClickRight = () => {
        const nextIndex = this.state.indexActive+1 > 4 ?  this.state.indexActive :this.state.indexActive + 1;
        this.setState({ indexActive: nextIndex });
      }
    render() {
        const { indexActive } = this.state
        if(indexActive===0){
            return(<div><IntroStep rightClick={this.onClickRight} /></div>)
        }
        if(indexActive===1){
            return(<div ><GeneralInfo  rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
        }
        if(indexActive===2){
            return(<div><DateAndTime rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
        }
        if(indexActive===3){
            return(<div><MapSearchLayout rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
        }
     if(indexActive==4){
        return (<div><EmailVerification rightClick={this.onClickRight} leftClick={this.onClickLeft}/></div>)
     }
               
        
    }

}
export default TeamCreator