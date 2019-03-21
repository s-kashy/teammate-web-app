import React, { Component } from "react"
import "./Profile.css"
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index"
import Input from "../../Component/Input/Input"
import Spinner from "../../Component/Ui/Spinner/Spinner"
import CheckBox from "../../Component/CheckBox/CheckBox"
import RadioButton from "../../Component/RadioButton/RadioButton"

class Profile extends Component {
    componentDidMount() {
        if (this.props.userProfile === "" || this.props.userProfile === undefined ||
            this.props.userProfile == null) {
            this.setState({ newUser: true })
        }
        else {

            let userInfo = JSON.parse(JSON.stringify(this.state.user))
            for (let i = 0; i < this.props.userProfile.sportInterest.length; i++) {
                let temp = this.props.userProfile.sportInterest[i].nameOfSport
                userInfo.sportInterest[temp].value = true
            }
            userInfo.firstname.value = this.props.userProfile.firstname
            userInfo.lastname.value = this.props.userProfile.lastname
            userInfo.about = this.props.userProfile.about
            this.textarea.value = this.props.userProfile.about
            userInfo.imageUrl.value = this.props.userProfile.imageUrl
            userInfo.imageUrl.fileName = this.props.userProfile.imageUrl.fileName
            if (this.props.userProfile.age) {
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
                value: "",
                error: false
            },

            lastname: {
                value: "",
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
            imageUrl: {
                value: "",
                fileName: "",
                didUpload: false,
                error: false,
            },
            about: "",
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
    scrollToMyRef = () => { window.scrollTo(0, this.inputUserBasicInfo.offsetTop) }
    resetInputError = () => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo.firstname.error = false
        userInfo.lastname.error = false
        this.setState({ user: userInfo })
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

            } else {
                setTimeout(
                    this.resetInputError, 3000
                )
                this.scrollToMyRef()

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
            imageUrl: this.state.user.imageUrl.value,
            fileName: this.state.user.imageUrl.fileName
        }

        let { imageUrl } = this.state.user
        var formData = new FormData()
        if (this.state.newUser) {
            if (imageUrl.didUpload) {
                formData.append('myImage', this.state.imageUrl.value);
                formData.append("value", JSON.stringify(dataUpdate))
                this.props.postUserProfile(formData)
            }
            else {
            this.props.newUserNoImageUpload(dataUpdate)
            }
        }
        else {
            if (imageUrl.didUpload) {
                formData.append('myImage', this.state.imageUrl.value);
                formData.append("value", JSON.stringify(dataUpdate))
                this.props.updateUserProfileOnServer(this.props.userProfile._id, formData)
            } else {
                this.props.updateUserNoImage(this.props.userProfile._id,dataUpdate)
            }
        }
        this.props.updateProfileUser(dataUpdate)
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
        var copyUserObj = JSON.parse(JSON.stringify(this.state.user))
        if (this.checkIfImageValid(event.target.files[0])) {
            copyUserObj.imageUrl.value = event.target.files[0]
            copyUserObj.imageUrl.fileName = event.target.files[0].name
            copyUserObj.imageUrl.didUpload = true
            this.setState({ user: copyUserObj }, () => {

            })
        } else {
            copyUserObj.imageUrl.error = true
            this.setState({ user: copyUserObj })
        }



    }
    checkIfImageValid = (fileToCheck) => {
        let file = fileToCheck;
        let fileType = file['name'];
        let parts = fileType.split('.');
        fileType = parts[parts.length - 1];
        fileType = fileType.toLowerCase()


        const validImageTypes = ['gif', 'jpeg', 'png',"jpg"];
        if (validImageTypes.includes(fileType)) {

            return true
        }
        return false
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
        const { sportInterest, ageGroup, firstname, lastname, imageUrl } = this.state.user
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
                            <p style={{ margin: "15px auto", fontSize: "30px" }}>Your Profile</p>
                            <div className="input-first-last-group-profile" ref={x => this.inputUserBasicInfo = x}>
                                <Input type="text" id="firstname" classInput="inputs-profile" placeholder="First Name"
                                    classLabel="label-basic-input-filed" value={firstname.value}
                                    error={firstname.error}
                                    name="firstname" change={(e) => this.onChangeHandlerInput(e)} />

                                <Input type="text" id="lastname" classInput="inputs-profile"
                                    error={lastname.error}
                                    value={lastname.value}
                                    placeholder="Last Name"
                                    errorClass="error-input-profile"
                                    classLabel="label-basic-input-filed"
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
                            <div>
                                <textarea wrap="physical" className="textarea-profile"
                                    ref={x => this.textarea = x} placeholder="Personal note"></textarea>
                            </div>
                            <div className="upload-image">
                                <p>Only JPG and PNG image can be upload</p>
                                <Input type="file" id="image" classInput="input-upload-file-image-profile"
                                    classLabel="label-upload-filed-profile"
                                    error={imageUrl.error}
                                    msgError="This is not A valid File"
                                    errorClass="error-image-upload-profile"
                                    title={imageUrl.fileName === "" || imageUrl.fileName === undefined ? "Your Picture" : imageUrl.fileName}
                                    change={(e) => this.onChangeImageHandler(e)} />
                                <span className="upload-image-icon-profile"><i className="fas fa-upload"></i></span>
                            </div>
                            <div >
                                <Input type="submit" classInput="button-submit" value="Submit" />
                            </div>
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
        updateUserNoImage: (id, profile) => dispatch(actionType.updateUserNoImage(id, profile)),
        newUserNoImageUpload: (profile) => dispatch(actionType.newUserNoImageUpload(profile)),
        updateProfileUser: (profile) => dispatch(actionType.updateProfileUser(profile)),
        updateUserProfileOnServer: (id, userProfile) => dispatch(actionType.updateUserProfileOnServer(id, userProfile)),
        postUserProfile: (userProfile) => dispatch(actionType.postUserProfile(userProfile))

    };
};

export default connect(mapStateHandler, mapStateDispatch)(Profile)