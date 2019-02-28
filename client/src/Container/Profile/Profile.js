import React, { Component } from "react"
import "./Profile.css"
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index"
import Input from "../../Component/Input/Input"
import { NEW_PROFILE } from "../../Url/Url"
import Spinner from "../../Component/Ui/Spinner/Spinner"
import CheckBox from "../../Component/CheckBox/CheckBox"
import RadioButton from "../../Component/RadioButton/RadioButton"

class Profile extends Component {

    componentDidMount() {
        if (this.props.userProfile == "" || this.props.userProfile === undefined ||
            Object.keys(this.props.userProfile).length == 0) {
                this.setState({newUser:true})
        }
        else {
            let userInfo = JSON.parse(JSON.stringify(this.state.user))
            for (let i = 0; i < this.props.userProfile.sportInterest.length; i++) {
                let temp = this.props.userProfile.sportInterest[i].nameOfSport
                userInfo.sportInterest[temp].value = true
            }
            if (this.props.userProfile.age !== undefined && this.props.userProfile.age !== '') {
                userInfo.ageGroup.forEach(item => {
                    if (item.value === this.props.userProfile.age) {
                        item.check = true
                    }
                    else {
                        item.check = false
                    }
                })
            }
            this.setState({ user: userInfo }, () => {
                this.setState({ isLoading: false })

            })
        }
    }
    state = {
        user: {
            firstname: {
                value: this.props.userProfile.firstname ? this.props.userProfile.firstname : "",
                error: false
            },

            lastname: {
                value: this.props.userProfile.lastname ? this.props.userProfile.lastname : "",
                error: false
            },
            ageGroup: [
                {
                    value: "below-30",
                    check: true,
                    name: "age"
                },
                {
                    value: "between-30 and 50",
                    check: false,
                    name: "age"
                },
                {
                    value: "above-50",
                    check: false,
                    name: "age"
                }
            ],
            image: this.props.userProfile.image?this.props.userProfile.image:"",
            about: this.props.userProfile.about ? this.props.userProfile.about : "",
            sportInterest: {
                running: { value: false },
                bicycle: { value: false },
                basketball: { value: false },
                soccer: { value: false },
                tennis: { value: false },
                volleyball: { value: false },
                aerobics: { value: false },
                yoga: { value: false },
                bowling: { value: false },
                golf: { value: false },
                poker: { value: false },
                snooker: { value: false }
            },
           
            isLoading: true

        },
        newUser: false,
    }
    submitHandler = (event) => {
        event.preventDefault()

        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo.about = this.textarea.value

        if (userInfo.firstname.value === "" || userInfo.firstname.value === undefined) {
            userInfo.firstname.error = true
        }
        if (userInfo.lastname.value === "" || userInfo.lastname.value === undefined) {
            userInfo.lastname.error = true
        }

        this.setState({ user: userInfo }, () => {
            if (!this.state.user.lastname.error && !this.state.user.firstname.error) {
                this.postProfileOfUser()

            }

        })
    }
    postProfileOfUser = () => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        let ageSelected = this.getAgePreferenceOfUser(userInfo.ageGroup)

        let arrayOfSportInterest = (this.filterSportInterestArray(userInfo.sportInterest))
        let dataUpdate = {
            firstname: userInfo.firstname.value,
            lastname: userInfo.lastname.value,
            age: ageSelected.value,
            email: this.props.email,
            about: userInfo.about,
            sportInterest: arrayOfSportInterest,
            image: this.state.user.image
        }


        var formData = new FormData()
        if (this.state.newUser) {
            formData.append('myImage', this.state.image);
            formData.append("value", JSON.stringify(dataUpdate))
            this.props.postUserProfile(NEW_PROFILE, formData)
        }
        else {
            formData.append('myImage', this.state.image);
            formData.append("value",JSON.stringify(dataUpdate))
            this.props.updateUserProfileOnServer(this.props.userProfile._id, formData)
        }

        this.props.history.push("/")



    }
    getAgePreferenceOfUser = (arrayOfChoiceAge) => {
        let ageChoice = arrayOfChoiceAge.find(item => {
            return item.check === true
        })
        return ageChoice
    }
    convertSportInterestToArray = (sportInterest) => {
        let sportTypeArray = []
        for (let key in sportInterest) {

            sportTypeArray.push({ value: sportInterest[key].value, nameOfSport: key })
        }

        return sportTypeArray
    }
    onChangeImageHandler = (event) => {
        let image = event.target.files[0]
        this.setState({ image: image })






    }
    filterSportInterestArray = (sportInterest) => {
        let sportTypeArray = []
        for (let key in sportInterest) {
            if (sportInterest[key].value)
                sportTypeArray.push({ value: sportInterest[key].value, nameOfSport: key })
        }
        return sportTypeArray
    }

    onChangeHandlerInput = (event) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo[event.target.name].value = event.target.value
        this.setState({ user: userInfo })

    }
    onChangeCheckBox = (event) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo.sportInterest[event.target.name].value = !userInfo.sportInterest[event.target.name].value
        this.setState({ user: userInfo }, () => { })
    }
    onChangeRadioHandler = (value) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo.ageGroup.forEach(item => {
            if (item.value == value) {
                item.check = true
            }
            else {
                item.check = false
            }
        })
        this.setState({ user: userInfo })
    }

    render() {
        let sportTypeArray = []
        const { sportInterest, ageGroup, firstname, lastname } = this.state.user


        let arrayRadio = ageGroup.map((item, index) => {
            return (<RadioButton
                classRadio="single-radio-input-profile"
                name={item.age}
                id={item.value}
                label={item.value}
                key={index}
                value={item.value}
                checked={item.check}
                click={(e) => this.onChangeRadioHandler(item.value)} />)
        })

        sportTypeArray = this.convertSportInterestToArray(sportInterest)

        let arrayCheckBox = sportTypeArray.map((item, index) => {
            return (<CheckBox
                key={index}
                click={(e) => this.onChangeCheckBox(e)}
                value={item.value}
                id={item.nameOfSport}
                classCheckbox="individual-checkbox-profile"
                name={item.nameOfSport} />)
        })


        return (
            <div> {this.state.isLoading ? <Spinner /> :
                <div className="wrapper-view-profile">

                    <form onSubmit={this.submitHandler}>
                        <div className="main-form-profile">
                            <p>Basic info</p>
                            <div className="input-first-last-group-profile">
                                <Input type="text" id="firstname" classInput="inputs-profile"
                                    classLabel="label-basic-input-filed" value={firstname.value} title="First-name:"
                                    error={firstname.error}

                                    name="firstname" change={(e) => this.onChangeHandlerInput(e)} />

                                <Input type="text" id="lastname" classInput="inputs-profile"
                                    error={lastname.error}
                                    value={lastname.value}
                                    classLabel="label-basic-input-filed" title="Last-name:"
                                    name="lastname" change={(e) => this.onChangeHandlerInput(e)} />
                            </div>
                            <p>Age group</p>
                            <div className="radio-group-profile">
                                {arrayRadio}
                            </div>
                            <p>Type of Sport you like</p>
                            <div className="sport-type-checkbox-profile">
                                {arrayCheckBox}
                            </div>
                            <p>Extra Info</p>
                            <div className="fieldset-upload-group">
                                <div>
                                    <fieldset>
                                        <legend style={{ color: "#3498db" }}>Share More Info</legend>
                                        <textarea wrap="physical" ref={x => this.textarea = x}>{this.state.user.about}</textarea>
                                    </fieldset>
                                </div>
                                <div className="upload-image">
                                    <Input type="file" id="image" classInput="input-upload-file-image"
                                        classLabel="label-basic-input-filed"
                                        change={(e) => this.onChangeImageHandler(e)} /><br></br>
                                    <span>If you would like you can upload a picture of yourself</span>
                                </div>
                            </div>
                            <Input type="submit" classInput="button-submit" value="submit" />
                        </div>

                    </form>

                </div>}</div>)
    }
}
const mapStateHandler = state => {
    return {
        userProfile: state.user.userProfile,
        email: state.user.email
    };
};
const mapStateDispatch = dispatch => {
    return {
        updateUserEmail: (email) => dispatch(actionType.updateUserEmail(email)),
        updateUserProfileOnServer: (id, userProfile) => dispatch(actionType.updateUserProfileOnServer(id, userProfile)),
        newUserJoin: (user) => dispatch(actionType.newUserJoin(user)),
        postUserProfile: (url, userProfile) => dispatch(actionType.postUserProfile(url, userProfile))

    };
};

export default connect(mapStateHandler, mapStateDispatch)(Profile)