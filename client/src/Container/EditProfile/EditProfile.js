import React, { Component } from "react"
import "./EditProfile.css"
import Aux from "../../Hoc/Hoc"

class Profile extends Component {
    state = {
        radioOpacity:false,
        user: {
            ageGroup: {
                below30:false,
                between30and50:false,
            },
            aboutMe: "",
            firstname: "",
            lastname: "",
            sportInterest: {
                running: false,
                bicycle: false,
                basketball: false,
                soccer: false,
                tennis: false,
                volleyball: false,
                aerobics: false,
                yoga: false,
                bowling:false,
                golf:false,
                poker:false,
                snooker:false

            }
            


        }
    }
    onChangeHandlerInput = (event) => { }
    onChangeHandlerRadio = (event) => { }

    render() {
        return (<Aux>
            <h2>Your Profile </h2>
            <form className='box-form-profile' onSubmit={this.submitFormHandler}>

                <div className="child-one">
                    <label htmlFor="first" className="form-label">first name</label>
                    <input type="text" id="first" name="firstname" onChange={(e) => this.onChangeHandlerInput(e)} />
                    <label htmlFor="last" className="form-label">last name</label>
                    <input type="text" id="last" name="lastname" onChange={(e) => this.onChangeHandlerInput(e)} />

                    <div className="form-age-group">
                        <h4>What age groups are you looking for?</h4>
                        <div className="radio-age-wrapper">
                            <label htmlFor="up-to-30">below 30
                        <input type="radio" id="up-to-30" value="below-30" name="radio-age" onChange={(e) => { this.onChangeHandlerRadio(e) }} />
                                <span className="radio-icon" ><i className="fas fa-check"></i></span>
                                {/* <span className="temp-icon-radio"></span> */}
                            </label>
                            <label htmlFor="between-30-50">between 30-50
                        <input type="radio" id="between-30-50" value="below-30" name="radio-age" onChange={(e) => { this.onChangeHandlerRadio(e) }} />
                                <span className="radio-icon"><i className="fas fa-check"></i></span>
                            </label>
                            <label htmlFor="above-50">above 50
                        <input type="radio" id="above-50" value="below-30" name="radio-age" onChange={(e) => { this.onChangeHandlerRadio(e) }} />
                                <span className="radio-icon"><i className="fas fa-check"></i></span>
                            </label>
                        </div>
                        <hr />
                    </div>

                    <fieldset>
                        <legend>Share more info</legend>
                        <textarea wrap="physical"></textarea>
                    </fieldset>

                </div>
                <div className="mobile-divider"></div>
                <div className="child-two">
                    <h4>Type of Sport You Like </h4>
                    <div className="check-box-group-sport-type">
                        <div className="label-checkbox-wrapper">
                        <div style={{float:"left"}}>
                            <input type="checkbox" id="soccer" name="soccer" value="soccer"  />
                            <label htmlFor="soccer">Soccer</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="running" name="running" value="running" />
                            <label htmlFor="running">Running</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="basketball" name="basketball" value="basketball" className="invisible" />
                            <label htmlFor="basketball">basketball</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="bicycle" name="bicycle" value="bicycle" />
                            <label htmlFor="bicycle">Bicycle</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="tennis" name="tennis" value="tennis" />
                            <label htmlFor="tennis">Tennis</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="yoga" name="yoga" value="yoga"  />
                            <label htmlFor="yoga">yoga</label>

                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="volleyball" name="volleyball" value="volleyball"  />
                            <label htmlFor="volleyball">volleyball</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="aerobics" name="aerobics" value="aerobics" />
                            <label htmlFor="aerobics">Aerobics</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="bowling " name="bowling " value="bowling "  />
                            <label htmlFor="bowling ">Bowling </label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="golf" name="golf" value="golf" />
                            <label htmlFor="golf">Golf</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="snooker" name="snooker" value="snooker" />
                            <label htmlFor="snooker">Snooker</label>
                            </div>
                        </div>
                        <div className="label-checkbox-wrapper">
                        <div className="float-left-checkbox">
                            <input type="checkbox" id="poker" name="poker" value="poker" />
                            <label htmlFor="poker">Poker</label>
                            </div>
                        </div>
                                          
                       
                        </div>
                        <div style={{position:"relative"}}>
                        <input type="submit" className="button-submit" value="submit" /><span className="submit-profile-btn-icon"><i className="far fa-caret-right"></i></span> 
                        </div>               
                   

                </div>
            </form>

        </Aux>)
    }
}
export default Profile
