import React, { Component } from 'react';

import './SingIn.css';

class SingIn extends Component {
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
            confirmPassword:{
                value: "",
                error: false
            }
        },
        generalError:false
    }
    onChangeHandler = (e) => { }
    render() {
        return (

            <div className="main-auth" >
                <h2 className="logo">Teammate</h2>

                <form className='box'>
                <h3 className="registrar-title">Sign in</h3>
                    <input type="text" name="email" placeholder="email" onChange={(e) => this.onChangeHandler(e)} />
                   {this.state.user.email.error && <p className="msg-email">*email not valid </p>}
                    <input type="password" name="password" placeholder="password" onChange={(e) => this.onChangeHandler(e)} />
                   {this.state.user.password.error && <p className='msg-password'>*password not valid </p>}
                    <input type="password" name="confirmPassword" placeholder="re type password" onChange={(e) => this.onChangeHandler(e)} />
                  <p className="ms-"></p>
                    <input type="submit" name="" value="Submit" />
               
                    {this.state.generalError && <p className="registrar-invalid">password do not match!!!</p>}
                </form>

            </div>

        );
    }
}

export default SingIn;
