import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import Header from "./Container/Header/Header"
import { connect } from "react-redux";
import { postRequestData } from "./RequestData/RequestData"


import './App.css';



class App extends Component {
componentDidMount(){

  
}
  state = {
    isLogin: false
  }

  

  render() {
      let isAuth=(
        <Switch>

        </Switch>
      )


    return (
      <div className="App">
        {this.state.isLogin ? <Header/> : null}
     
        <Switch>

        </Switch>
      </div>
    );
  }
}
const mapStateHandler = state => {
  return {
    auth: state.auth.token !== null
  };
};
const mapStateDispatch = dispatch => {
  return {
   // authToken: () => dispatch(actionType.authCheckState())
  };
};

export default   connect(
  mapStateHandler,
  mapStateDispatch
)(App)

