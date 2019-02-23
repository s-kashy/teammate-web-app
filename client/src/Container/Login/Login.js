import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { checkEmail, checkPassword } from "../../Utils/emailValidate"
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index"
import './Login.css';

class Login extends Component {
    componentDidMount() {

    }
    resetError=()=>{
        let userInput=this.state.user
        userInput.email.error=false
        userInput.password.error=false
        this.setState({user:userInput,generalError:false})

    }
    state = {
        user: {
            email: {
                value: undefined,
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
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        if (!checkEmail(userInfo.email.value)) {

            userInfo.email.error = true
        }
        else if (!checkPassword(userInfo.password.value)) {
            userInfo.error = true

        }
        this.setState({ user: userInfo }, () => {
            if (!this.state.user.email.error && !this.state.user.password.error) {
                this.props.loginWithCredential({ email: userInfo.email.value, password: userInfo.password.value }).then(res => {
                            if(res==="200"){
                                this.props.history.push("/")
                            }
                }).catch(err => {
                    console.log("login", err)
                    this.setState({generalError:true})
                    setTimeout(this.resetError,5000)

                })
            }
        })


    }
    onChangeHandler = (event) => {
        let userInput = JSON.parse(JSON.stringify(this.state.user))
        userInput[event.target.name].value = event.target.value
        console.log("onChange user login=>", userInput)
        this.setState({ user: userInput }, () => {

        })


    }
    render() {
        var { email, password } = this.state.user
        return (
            <div className="main-auth" >
                <h2 className="logo">Teammate</h2>

                <form className="box-login" onSubmit={this.submitUserFormHandler} ref={el => this.formAuth = el} style={{left:"75%"}} >
                    <h3 className="auth-title">Login <Link style={{ color: "#FFF" }} to="/api/auth/sign-in"><span className="auth-sing-in-icon"><i className="fas fa-sign-in-alt"></i></span><span className="auth-new-user">*New user</span></Link></h3>
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
        loginWithCredential: (user) => dispatch(actionType.loginWithCredential(user))
    };
};
export default connect(mapStateHandler, mapStateDispatch)(Login);
