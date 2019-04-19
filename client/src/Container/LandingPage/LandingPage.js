import React, { Component } from "react"
import "./LandingPage.css"
import Tabs from "../../Component/Tabs/Tabs"

class LadingPage extends Component {
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.successFunction, this.errorFunction);
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }

    }
    successFunction = (position) => {
       
    }
    errorFunction = (err) => {
       
    }
    render() {
        return (<div>
            <Tabs />
        </div>)
    }

}
export default LadingPage

