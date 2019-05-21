import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { checkEmail, checkPassword } from "../../Utils/emailValidate"
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index"
import './Login.css';

class Login extends Component {
   
    state = {
        user: {
            email: {
                value: "",
                error: false
            },
            password: {
                value: "",
                error: false
            }
        },
        generalError: false
    }
    submitUserFormHandler = (event) => {
        event.preventDefault()
        let userInfo = {...this.state.user}
        if (!checkEmail(userInfo.email.value)) {
            userInfo.email.error = true
        }
        else if (!checkPassword(userInfo.password.value)) {
            userInfo.password.error = true

        }
        this.setState({ user: userInfo }, () => {
            if (!this.state.user.email.error && !this.state.user.password.error) {
                this.props.loginWithCredential({ email: userInfo.email.value.toLowerCase(), password: userInfo.password.value }).then(res => {
                    if (res) {
                        this.props.updateUserEmail(res)
                        this.props.getUserCalender({email:userInfo.email.value})
                        this.props.history.push("/")
                        
                    }
                }).catch(err => {
         
                    this.setState({ generalError: true })
                 

                })
            }
        })


    }
    onChangeHandler = (event) => {
        let userInput = {...this.state.user}
        userInput[event.target.name].value = event.target.value
        userInput[event.target.name].error=false
        this.setState({ user: userInput, generalError:false}, () => {

        })


    }
    render() {
        var { email, password } = this.state.user
        return (
            <div className="main-auth" >
                <h2 className="logo-login">TeamMate</h2>
                <form className="box-login" onSubmit={this.submitUserFormHandler} ref={el => this.formAuth = el} style={{ left: "75%" }} >
                    <h3 className="auth-title">Login <Link style={{ color: "#FFF" }} to="/sign-in"><span className="auth-new-user">*New user</span></Link></h3>
                    <input type="text" name="email" placeholder="email" onChange={(event) => this.onChangeHandler(event)} autoComplete="new-email" value={email.value} />
                    {email.error && <p className="msg-email">*email not valid </p>}
                    <input type="password" value={password.value} name="password" onChange={(event) => this.onChangeHandler(event)} autoComplete="new-password" placeholder="password" />
                    {password.error && <p className='msg-password'>*password not valid </p>}
                    <input type="submit" name="" value="Login" disabled={this.state.generalError} />
                    <Link to="/" className='auth-sing-up'>*forgot your password </Link>
                    {this.state.generalError && <p className="auth-invalid">invalid user or password</p>}
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
        updateUserEmail: (email) => dispatch(actionType.updateUserEmail(email)),
        loginWithCredential: (user) => dispatch(actionType.loginWithCredential(user)),
        getUserCalender: email => dispatch(actionType.getUserCalender(email))
    };
};
export default connect(mapStateHandler, mapStateDispatch)(Login);
