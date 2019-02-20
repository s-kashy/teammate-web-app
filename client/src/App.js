import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom"
import Layout from "./Container/Layout/Layout"
import { getRequestData, postRequestData } from "./RequestData/RequestData"
import Login from "./Container/Login/Login"
import SignIn from "./Container/SignIn/SignIn"
import * as actionType from "./Store/actions/index"
import Error from "./Component/Error/Error"
import LandingPage from "./Container/LandingPage/LandingPage"
import Header from "./Container/Header/Header"
import Spinner from "./Component/Ui/Spinner/Spinner"
import { LOG_OUT, SIGN_IN_NEW_USER, LOG_IN_CHECK } from "./Url/Url"
import { connect } from "react-redux";
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.authCheckState()
  }


  render() {
    let redirectAuth = (
      <Switch>
        <Route exact path="/api/auth/login" component={Login} />
        <Route path="/api/auth/sign-in" component={SignIn} />
        <Redirect to="/api/auth/login" />
        <Route component={Error} />
      </Switch>
    )
    if (this.props.auth) {
      redirectAuth = (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Redirect to="/" />
          <Route component={Error} />
        </Switch>)
    }

    return (
      <div className="App">
        {this.props.auth !== null && this.props.auth === true ? <Header /> : null}
        {this.props.auth != null ? <Layout>
          {redirectAuth}
        </Layout> : <Spinner />}

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
    authCheckState: () => dispatch(actionType.authCheckState()),
    newUserJoin: () => dispatch(actionType.newUserJoin())
  };
};

export default withRouter(connect(
  mapStateHandler,
  mapStateDispatch
)(App))

