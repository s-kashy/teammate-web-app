import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Layout from "./Container/Layout/Layout";

import Login from "./Container/Login/Login";
import SignIn from "./Container/SignIn/SignIn";
import * as actionType from "./Store/actions/index";
import Error from "./Component/Error/Error";
import LandingPage from "./Container/LandingPage/LandingPage";
import Header from "./Container/Header/Header";
import SearchTeam from "./Container/SearchTeam/SearchTeam";
import TeamCreator from "./Container/TeamCreator/TeamCreator";
import Profile from "./Container/Profile/Profile";
import Spinner from "./Component/Ui/Spinner/Spinner";
import About from "./Container/About/About";
import ChatBoardTeam from "./Container/ChatBoardTeam/ChatBoardTeam";
import YourTeams from "./Container/YourTeams/YourTeams";

import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props
      .authCheckState()
      .then(res => {
        this.props
          .initializeUser(res)
          .then(res => {
            return this.props.getUserCalender({ email: res });
          })
          .then(() => {
            this.props.history.push("/");
          });
      })
      .catch(err => {
        this.props.history.push("/api/auth/login");
        //this.props.history.push("/")
      });
  }

  render() {
    let redirectAuth = (
      <Switch>
        <Route exact path="/api/auth/login" component={Login} />
        <Route path="/api/auth/sign-in" component={SignIn} />
        <Redirect to="/api/auth/login" />
        <Route component={Error} />
      </Switch>
    );
    if (this.props.auth) {
      redirectAuth = (
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/create-team" component={TeamCreator} />
          <Route path="/search-team" component={SearchTeam} />
          <Route path="/your-teams" component={YourTeams} />
          <Route path="/about" component={About} />
          <Route path="/chat-team" component={ChatBoardTeam} />
          <Route exact path="/" component={LandingPage} />
          <Redirect to="/" />
          {/* <Route component={Error} /> */}
        </Switch>
      );
    }

    return (
      <div className="App">
        {this.props.auth !== null ? (
          <Layout>
            {this.props.auth !== null && this.props.auth === true ? (
              <Header />
            ) : null}
            {redirectAuth}
          </Layout>
        ) : (
          <Spinner />
        )}
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
    initializeUser: email => dispatch(actionType.initializeUser(email)),
    newUserJoin: () => dispatch(actionType.newUserJoin()),
    getUserCalender: email => dispatch(actionType.getUserCalender(email))
  };
};

export default withRouter(
  connect(
    mapStateHandler,
    mapStateDispatch
  )(App)
);
