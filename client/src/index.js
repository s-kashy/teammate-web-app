import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";
import authR from "./Store/Reducer/auth"
 import "../node_modules/react-datepicker/dist/react-datepicker.css";
import '../node_modules/react-day-picker/lib/style.css';
import '../node_modules/rc-time-picker/assets/index.css';
import controlUiR from "./Store/Reducer/control_ui"
import profileR from "./Store/Reducer/profile"
import teamCreateInfoR from "./Store/Reducer/teamCreateInfo"
import thunk from "redux-thunk";
import App from './App';
import * as serviceWorker from './serviceWorker';

const rooReducer = combineReducers({
    auth: authR,
    spinnerState: controlUiR,
    user:profileR,
    teamCreateInfo:teamCreateInfoR


});
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rooReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
