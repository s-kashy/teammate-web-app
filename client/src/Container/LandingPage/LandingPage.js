import React, { Component } from "react"
import "./LandingPage.css"
import { connect } from "react-redux"
import * as actionType from "../../Store/actions/index"


class LadingPage extends Component {
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.successFunction, this.errorFunction);
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }

    }
    successFunction = (position) => {
        this.props.setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
    }
    errorFunction = (err) => {
        this.props.openErrorMsg()
    }
    render() {
        return (<div>
            landing page
        </div>)
    }

}


const mapStateHandler = state => {
    return {

    }
}
const mapStateDispatch = dispatch => {
    return {
        setLocation: (loc) => dispatch(actionType.setLocationUser(loc)),
        openErrorMsg: () => dispatch(actionType.openErrorMsg())
    }
}
export default connect(mapStateHandler, mapStateDispatch)(LadingPage)

