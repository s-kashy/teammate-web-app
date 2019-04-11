import React, { Component } from "react"
import "./EmailVerification.css"
import Input from "../../../Component/Input/Input"
import * as actionType from "../../../Store/actions/index"
import { connect } from "react-redux";
import { isEmail } from 'validator';

import ContralTeamCreate from "../ContralTeamCreate/ContralTeamCreate"
class EmailVerification extends Component {
    state = {
        email: {
            value: "",
            error: false
        },
        webToken: {
            value: "",
            error: false
        },
        showInputToken: false,
        isValid: false
    }
    onClickConfirmHandler = () => {

        let data = {
            email: this.props.emailRegister,
            token: JSON.parse(JSON.stringify(this.state.webToken.value)),
            emailManger: JSON.parse(JSON.stringify(this.state.email.value))
        }
        this.props.checkValidToken(data).then(res => {
            if (res.status === 200) {
                this.setState({ isValid: true }, () => {
                    this.props.saveEmailManger(this.state.email.value)
                })

            }
        }).catch(err => {
            console.log(err)
        })

    }
    onClickHandler = () => {
        let emailManger = JSON.parse(JSON.stringify(this.state.email))
        emailManger.value = emailManger.value.trim()
        console.log("email reg",this.props.emailRegister)
        let data = {
            email: this.props.emailRegister,
            emailManger: emailManger.value
        }

        if (isEmail(emailManger.value)) {
            this.setState({ showInputToken: true }, () => {
                this.props.sendEmailToken(data).then(res => {

                }).catch(err => {
                    let email = JSON.parse(JSON.stringify(this.state.email))
                    email.error = true
                    this.setState({ email: email })

                })
            })
        } else {
            emailManger.error = true
            this.setState({ email: emailManger })
        }
    }
    onChangeTokenHandler = (event) => {
        let copyToken = JSON.parse(JSON.stringify(this.state.webToken))
        copyToken.value = event.target.value
        copyToken.value = copyToken.value.trim()
        copyToken.error = false
        this.setState({ webToken: copyToken }, () => {

        })
    }
    onChangeHandler = (event) => {
        let emailInfo = JSON.parse(JSON.stringify(this.state.email))
        emailInfo.value = event.target.value
        emailInfo.error = false
        this.setState({ email: emailInfo }, () => {

        })

    }
    render() {
        let { email, webToken } = this.state
        return (<div className="main-email-verification">
            <div className="wrapper-input-email-verification" >
                <div style={{ position: "relative" }}>
                    <Input classLabel="label-input-email-verification" type="text" value={email.value} classInput="input-email-verification"
                        error={email.error} errorClass='error-msg-email-verification' change={(e) => this.onChangeHandler(e)} msgError="*Not valid Email" disabled={this.state.showInputToken}
                        title="Enter a email" name="emailManger" /><button disabled={this.state.showInputToken} className="submit-btn-email-verification" onClick={this.onClickHandler}>
                        <span className="icon-submit-email-verification">
                            <i className="fas fa-check"></i></span></button>
                </div>
                {this.state.showInputToken && (<div style={{position:"relative",marginTop:'20px'}}><Input classLabel="label-confirm-email-verification" type="text" msgError="*Not valid Token" value={this.state.webToken.value} classInput="input-confirm-email-verification"
                    error={webToken.error} errorClass='error-confirm-email-verification' change={(e) => this.onChangeTokenHandler(e)}
                    title="Enter The Token" name="webToke" /><button style={{ backgroundColor: "green" }} className="submit-confirm-btn-email-verification" onClick={this.onClickConfirmHandler}>
                        <span className="icon-submit-confirm-email-verification">
                            <i className="fas fa-check"></i></span></button></div>)}
            </div>
            <div className="msg-email-verification"><span> ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type
                   specimen book. It ha popularised in the
                    1960s with the release of Letraset sheets
                     containing Lorem Ipsum passages,
                   and more recently with desktop
          publis</span></div>
            <div>
                <ContralTeamCreate class="contral-team-email-verification" leftClick={this.props.leftClick} rightClick={this.props.rightClick} disabled={!this.state.isValid} />
            </div>
        </div>)
    }
}
const mapStateHandler = state => {
    return {
        emailRegister: state.user.email
    };
};
const mapStateDispatch = dispatch => {
    return {
        sendEmailToken: (email) => dispatch(actionType.sendEmailToken(email)),
        checkValidToken: (data) => dispatch(actionType.checkValidToken(data)),
        saveEmailManger: (email) => dispatch(actionType.saveEmailManger(email))
    };
};
export default connect(mapStateHandler, mapStateDispatch)(EmailVerification)