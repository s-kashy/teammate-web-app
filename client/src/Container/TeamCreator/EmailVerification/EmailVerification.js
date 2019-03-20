import React, { Component } from "react"
import "./EmailVerification.css"
import Input from "../../../Component/Input/Input"
import * as actionType from "../../../Store/actions/index"
import { connect } from "react-redux";
import ContralTeamCreate from "../ContralTeamCreate/ContralTeamCreate"
class EmailVerification extends Component {
    state = {
        email: {
            value: "",
            error: false
        },
        webToken: {
            value: ""
        },
        showInputToken: false,
        isValid: false
    }
    onClickConfirmHandler = () => {
        let data = {
            email: this.props.emailRegister,
            token: this.state.webToken.value
        }
        this.props.checkValidToken(data).then(res => {
            console.log("res", res)
        }).catch(err => {
            console.log(err)
        })

    }
    onClickHandler = () => {
        let emailManger = JSON.parse(JSON.stringify(this.state.email.value))
        emailManger = emailManger.trim()
        let data = {
            email: this.props.emailRegister,
            emailManger: emailManger
        }
        this.setState({ showInputToken: true }, () => {
            this.props.sendEmailToken(data).then(res => {
                if (res.status === 200) {
                    this.setState({ isValid: true })
                }
            }).catch(err => {
                console.log(err)
            })
        })
    }
    onChangeTokenHandler = (event) => {
        let copyToken = JSON.parse(JSON.stringify(this.state.webToken))
        copyToken.value = event.target.value
        copyToken.value = copyToken.value.trim()
        this.setState({ webToken: copyToken }, () => {

        })
    }
    onChangeHandler = (event) => {
        let emailInfo = JSON.parse(JSON.stringify(this.state.email))
        emailInfo.value = event.target.value
        this.setState({ email: emailInfo })

    }
    render() {
        let { email } = this.state
        return (<div className="main-email-verification">
            <div className="wrapper-input-email-verification" >
                <Input classLabel="label-input-email-verification" type="text" value={email.value} classInput="input-email-verification"
                    error={email.error} errorClass='error-msg-email-verification' change={(e) => this.onChangeHandler(e)} disabled={this.state.showInputToken}
                    title="Enter a email" name="emailManger" /><button className="submit-btn-email-verification" onClick={this.onClickHandler}>
                    <span className="icon-submit-email-verification">
                        <i className="fas fa-check"></i></span></button>

                {this.state.showInputToken && (<span><Input classLabel="label-confirm-email-verification" type="text" value={this.state.webToken.value} classInput="input-confirm-email-verification"
                    error={email.error} errorClass='error-confirm-email-verification' change={(e) => this.onChangeTokenHandler(e)}
                    title="Enter The Token" name="webToke" /><button style={{ backgroundColor: "green" }} className="submit-confirm-btn-email-verification" onClick={this.onClickConfirmHandler}>
                        <span className="icon-submit-confirm-email-verification">
                            <i className="fas fa-check"></i></span></button></span>)}
            </div>
            <div className="msg-email-verification"><span> ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type
                   specimen book. It ha popularised in the
                    1960s with the release of Letraset sheets
                     containing Lorem Ipsum passages,
                   and more recently with desktop
          publis</span></div>
            <div>
                <ContralTeamCreate class="contral-team-email-verification" disabled={!this.state.isValid} />
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
        checkValidToken: (data) => dispatch(actionType.checkValidToken(data))

    };
};
export default connect(mapStateHandler, mapStateDispatch)(EmailVerification)