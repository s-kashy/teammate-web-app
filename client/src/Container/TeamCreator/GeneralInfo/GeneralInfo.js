import React, { Component } from "react"
import "./GeneralInfo.css"
import _ from "lodash"
import Input from "../../../Component/Input/Input"
import ContralTeamCreate from "../ContralTeamCreate/ContralTeamCreate"
import { arraySportType } from './arrayOfSportType'
import OptionMenu from '../../../Component/OptionMenu/OptionMenu'
class GeneralInfo extends Component {




    state = {
        userBasic: {
            isBasicInfoValid: false,
            nameOfTeam: {
                value: "",
                error: false,

            },
            numberOfTeam: {
                value: "",
                error: false,

            }

        },
        aboutTheTeam: {
            value: "",
            error: false,
            touch: false

        },
        typeOfSport: arraySportType[0],
        imageUrl: {
            file: "",
            fileName: "",
            valid: false,
            error: false
        },
        isValid: false
    }
    componentDidMount() {


    }

    checkValidForm = () => {
        console.log(this.state)
        const { userBasic, aboutTheTeam, typeOfSport, imageUrl } = this.state
        if (userBasic.isBasicInfoValid && !aboutTheTeam.error
            && imageUrl.valid && typeOfSport != arraySportType[0].toString()) {
            this.setState({ isValid: true })
        } else {
            this.setState({ isValid: false })
        }
    }
    onChangeTextAreaHandler = (event) => {
        let aboutTheTeam = JSON.parse(JSON.stringify(this.state.aboutTheTeam))
        aboutTheTeam.value = event.target.value
        if (aboutTheTeam.value === "" || aboutTheTeam.value === undefined) {
            aboutTheTeam.error = true
        }
        else {
            aboutTheTeam.error = false
            aboutTheTeam.touch = true
        }
        this.setState({ aboutTheTeam: aboutTheTeam }, () => {
            this.checkValidForm()
        })
    }
    checkIfImageValid = (fileToCheck) => {
        const file = fileToCheck;
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (validImageTypes.includes(fileType)) {
            return true
        }
        return false
    }
    onChangeInputHandler = (event) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.userBasic))
        userInfo[event.target.name].value = event.target.value

        var key = event.target.name
        this.setState({ userBasic: userInfo }, () => {
            this.checkBasicInfoValid(key)
        })
    }
    checkBasicInfoValid = (key) => {
        var userBasic = JSON.parse(JSON.stringify(this.state.userBasic))
        if (key === "numberOfTeam") {
            if (userBasic[key].value === "" || userBasic[key].value == undefined || parseInt(userBasic[key].value) <= 0) {
                userBasic[key].error = true
                userBasic.isBasicInfoValid = false

            } else {
                userBasic[key].error = false
            }
            this.setState({ userBasic: userBasic }, () => {
                this.checkValidForm()
                return

            })
        }
        else if (key === "nameOfTeam") {
            if (userBasic[key].value === "" || userBasic[key].value == undefined) {
                userBasic[key].error = true
                userBasic.isBasicInfoValid = false
                this.checkValidForm()
            } else {
                userBasic[key].error = false
            }
            this.setState({ userBasic: userBasic }, () => {
                this.checkValidForm()
                return
            })
        }
        if (!userBasic["nameOfTeam"].error && !userBasic["numberOfTeam"].error) {
            userBasic.isBasicInfoValid = true

            console.log("valid state ", userBasic["nameOfTeam"])
            this.setState({ userBasic: userBasic }, () => {
                console.log("user basic", userBasic)
                this.checkValidForm()
            })
        }



    }
    clickOptionChangeHandler = (event) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.typeOfSport))
        userInfo = event.target.value
        this.setState({ typeOfSport: userInfo }, () => {
            console.log("type of sport", this.state.typeOfSport)
            this.checkValidForm()
        })
    }
    imageUploadHandler = (event) => {
        event.preventDefault();
        let userInfo = JSON.parse(JSON.stringify(this.state.imageUrl))
        userInfo.file = event.target.files[0]
        userInfo.fileName = event.target.files[0].name
        userInfo.valid = this.checkIfImageValid(event.target.files[0])
        this.setState({ imageUrl: userInfo }, () => {
            this.checkValidForm()
        })
    }
    render() {
        let { nameOfTeam, numberOfTeam } = this.state.userBasic
        let { typeOfSport, aboutTheTeam, imageUrl } = this.state
        return (<div className="main-general-info">

            <div className="from-general-info">
                <div className="option-menu-general-info">
                    <OptionMenu array={arraySportType} selected={typeOfSport} click={this.clickOptionChangeHandler} />
                </div>
                <div className="input-wrapper-general-info" >
                    <Input type="text" placeholder="Name of Team"
                        name="nameOfTeam"
                        value={nameOfTeam.value}
                        errorClass="error-input-name-general-info"
                        classInput="input-name-of-team-general-info"
                        change={(e) => this.onChangeInputHandler(e)}
                        error={nameOfTeam.error} />

                    <Input type="number" placeholder="Max of Team members"
                        name="numberOfTeam"
                        classInput="input-number-of-team-general-info"
                        change={(event) => this.onChangeInputHandler(event)}
                        min="1"
                        errorClass="error-input-number-general-info"
                        value={numberOfTeam.value}
                        error={numberOfTeam.error} />
                    <div className="upload-div-general-info">
                        <Input type="file"
                            classInput="input-image-of-team-general-info"
                            name="imageUrl"
                            error={imageUrl.error}
                            classLabel="label-image-of-team-general-info"
                            change={(event) => this.imageUploadHandler(event)}
                            title={imageUrl.fileName == "" ? "Team logo" : imageUrl.fileName} /><span className="icon-upload-image-general-info"><i style={{ fontSize: "30px", fontWeight: "1000", color: "red" }} className="far fa-cloud-upload-alt"></i></span>
                    </div>

                    <div>
                        <textarea className="textarea-general-info"
                            onKeyUp={(event) => this.onChangeTextAreaHandler(event)}
                            placeholder={aboutTheTeam.error && aboutTheTeam.touch ? "Don't forget*" : "Little about the team"}></textarea>
                    </div>
                </div>


            </div>
            <div className="msg-instruction-general-info">
                <div style={{ margin: " -30px auto" }}>
                    <span><strong>
                        essentially unchanged. It was popularised in the
                             1960s with the release of Letraset sheets containing Lorem
                             Ipsum passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of Lorem
                        </strong>
                    </span>


                </div>

            </div>
            <ContralTeamCreate rightClick={this.props.rightClick}
                leftClick={this.props.leftClick} disabled={!this.state.isValid}
                class="position-contral-general-info" />
        </div>)


    }



}



export default GeneralInfo