import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { checkEmail, checkPassword } from "../../Utils/emailValidate"
import {SIGN_IN_NEW_USER} from "../../Url/Url"
import {getRequestData} from "../../RequestData/RequestData"
import './Login.css';

class Login extends Component {
    componentDidMount() {
        let data = {
            method: 'post',
            data: { password: "sshlomo", email: "shlomo@gnail.com" },
            url: SIGN_IN_NEW_USER,
            headers: "test header"
          }
          getRequestData(data).then(res => {
            console.log("res in login ", res.data)
          }).catch(err => {
            console.log(err)
          })
    }
    state = {
        user: {
            email: {
                value: undefined,
                emailError: ""
            },
            password: {
                value: "",
                passwordError: undefined
            }
        },

        generalError: false
    }
    submitUserFormHandler = (event) => {
        event.preventDefault()
        let tempUser = {...this.state.user}
  

        if (!checkEmail(tempUser.email.value)) {
            console.log("error",tempUser)
            tempUser.email.emailError = true
            this.setState({ user: tempUser })
            console.log("Check email", tempUser)
            return

        }
        else if (!checkPassword(tempUser.password)) {
            tempUser.passwordError = true
            this.setState({ user: tempUser })
            return;
        }
        console.log("call server")

    }
    onChangeHandler = (event) => {
        let userInput = JSON.parse(JSON.stringify(this.state.user))

        userInput[event.target.name].value = event.target.value
        console.log("onChange user login=>",userInput)
        this.setState({ user: userInput },()=>{
         
        })


    }
    render() {
        const { emailError, passwordError } = this.state.user
        return (

            <div className="main-auth" >
                <h2 className="logo">Teammate</h2>

                <form className='box' onSubmit={this.submitUserFormHandler} ref={el=>this.formAuth=el} >
                    <h3 className="auth-title">Login <Link style={{color:"#FFF"}} to="/api/auth/sign-in"><span className="auth-sing-in-icon"><i className="fas fa-sign-in-alt"></i></span><span className="auth-new-user">*New user</span></Link></h3>
                    <input type="text" name="email" placeholder="email" onChange={(event) => this.onChangeHandler(event)} />
                    {emailError && <p className="msg-email">*email not valid </p>}
                    <input type="password" value={this.state.user.password.value}name="password"  onChange={(event) => this.onChangeHandler(event)} />
                    {passwordError && <p className='msg-password'>*password not valid </p>}
                    <input type="submit" name="" value="Login" disabled={false} />
                    <Link to="/" className='auth-sing-up'>*forgot your password </Link>
                    {this.state.generalError && <p className="auth-invalid">invalid user or password</p>}
                </form>

            </div>

        );
    }
}

export default Login;
