import React, { Component } from 'react';
import { checkEmail, checkPassword, checkMatchPassword } from "../../Utils/emailValidate"
import "./SignIn.css";
import * as actionType from "../../Store/actions/index"
import { connect } from "react-redux";

class SignIn extends Component {
    state = {
        user: {
            email: {
                value: "",
                error: false
            },
            password: {
                value: "",
                error: false
            },
            confirmPassword: {
                value: "",

            }
        },
        generalError: false,
        emailExist:false
    }

    resetError = () => {
        let inputUser = JSON.parse(JSON.stringify(this.state.user))
        inputUser.email.error = false
        inputUser.password.error = false
        this.setState({ user: inputUser, generalError: false,emailExist:false })
    }
    submitFormHandler = (event) => {
        event.preventDefault()
        const { email, password, confirmPassword } = this.state.user
        let { generalError } = this.state
        if (!checkEmail(email.value)) {
            email.error = true
        } else {
            email.error = false
        }
        if (!checkPassword(password.value)) {
            console.log("password",password)
            password.error = true

        } else {
            password.error = false
        }
        if (!checkMatchPassword(password.value, confirmPassword.value)) {
            generalError = true

        }
        let inputUser = JSON.parse(JSON.stringify(this.state.user))
        inputUser.email = email
        inputUser.password = password
      
        this.setState({ user: inputUser, generalError: generalError }, () => {
            if (!this.state.user.email.error && !this.state.user.password.error && !this.state.generalError) {
                let newUser = {
                    email: this.state.user.email.value,
                    password: this.state.user.password.value
                }
                this.props.newUserJoin(newUser).then(res=>{
                    if (res==="200"){
                        this.props.history.push('/');
                    }
                }).catch(err=>{
                   this.setState({emailExist:true})
                   setTimeout(this.resetError,5000)
                })
            } else {
                setTimeout(this.resetError, 4000)
            }
        })
    }
    onChangeHandler = (event) => {
        let userInput = JSON.parse(JSON.stringify(this.state.user))
        userInput[event.target.name].value = event.target.value
        this.setState({ user: userInput },()=>{
            console.log(this.state.user)
        })

    }
    render() {
        return (
            <div className="main-auth" >
                <h2 className="logo">Teammate</h2>
                <form className='box' onSubmit={this.submitFormHandler}>
                    <h3 className="registrar-title">Sign in</h3>
                    <input type="text" name="email" placeholder="email" onChange={(e) => this.onChangeHandler(e)} value={this.state.user.email.value } />
                    {this.state.user.email.error && <p className="msg-email">*email not valid </p>}
                    <input type="password" name="password" placeholder="password" onChange={(e) => this.onChangeHandler(e)} value={this.state.user.password.value } />
                    {this.state.user.password.error && <p className='msg-password'>*password not valid </p>}
                    <input type="password" name="confirmPassword" placeholder="re type password" onChange={(e) => this.onChangeHandler(e)} value={this.state.user.confirmPassword.value } />

                    <input type="submit" name="" value="Submit" />

                    {this.state.generalError && <p className="registrar-invalid">password do not match</p>}
                    {this.state.emailExist&&<p className="email-exist-msg">Email already exist</p>}
                </form>

            </div>

        );
    }
}
const mapStateHandler = state => {
    return {
        auth: state.auth.isAuthenticate
    };
};
const mapStateDispatch = dispatch => {
    return {
        //authCheckState: () => dispatch(actionType.authCheckState()),
        newUserJoin: (user) => dispatch(actionType.newUserJoin(user))
    };
};

export default connect(mapStateHandler, mapStateDispatch)(SignIn);
