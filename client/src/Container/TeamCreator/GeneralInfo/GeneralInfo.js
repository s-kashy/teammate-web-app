import React, { Component } from "react"
import "./GeneralInfo.css"
import Input from "../../../Component/Input/Input"
import ContralTeamCreate from "../ContralTeamCreate/ContralTeamCreate"
import { arraySportType } from './arrayOfSportType'
import OptionMenu from '../../../Component/OptionMenu/OptionMenu'
class GeneralInfo extends Component {



    componentDidMount() {

    }
    onChangeInputHandler = (event) => { }
    clickOptionChangeHandler = (event) => {
        console.log("click", event.target.value)
    }
    state = {
        nameOfTeam: {
            value: "",
            error: false
        },
        numberOfTeam: {
            value: "",
            error: false
        },
        typeOfSport: ""
    }

    render() {

        let { nameOfTeam, numberOfTeam } = this.state
        return (<div className="main-general-info">

            <div className="from-general-info">
                <form >
                    <div className="option-menu-general-info">
                        <OptionMenu array={arraySportType} click={this.clickOptionChangeHandler} />
                    </div>
                    <div >
                        <Input type="text" placeholder="Name of Team"
                            name="nameOfTeam"
                            classInput="input-name-of-team-general-info"
                            change={(e) => this.onChangeInputHandler(e)}
                            error={this.state.nameOfTeam.error} />

                        <Input type="number" placeholder="max of Team members"
                            name="numberOfTeam"
                            classInput="input-number-of-team-general-info"
                            change={(e) => this.onChangeInputHandler(e)}
                            min="1"
                            error={numberOfTeam.error} />
                    </div>
                    <div style={{position:"relative"}} className="upload-div-general-info">
                        <Input type="file"
                            classInput="input-image-of-team-general-info"
                            classLabel="label-image-of-team-general-info"
                            change={(event) => this.onChangeInputHandler(event)}
                            title="Team logo" /><span className="icon-upload-image-general-info"><i style={{fontSize:"30px",fontWeight:"1000",color:"red"}} className="far fa-cloud-upload-alt"></i></span>
                    </div>
                    <div>
                    <textarea className="textarea-general-info" placeholder="little about the team"></textarea>
                    </div>
                </form>
            </div>
            <div className="msg-instruction-general-info">
                <div style={{ display: "block" }}>
                    <span><strong>
                        essentially unchanged. It was popularised in the
                             1960s with the release of Letraset sheets containing Lorem
                             Ipsum passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of Lorem
                        </strong>
                    </span>
              
                </div>

            </div>

        </div>)


    }



}



export default GeneralInfo