import React, { Component } from "react"
import "./ViewInfoWindow.css"

class ViewInfoWindow extends Component {
    onClickHandler = () => {
        alert("hello")
        console.log('click demo')
    }
    render() {
        return (
            <div className="wrapper-info-window">
                <h4>{this.props.name}</h4>
               {this.props.type && (<p className="type-meetup-time-info-window">meetup {this.props.type}</p>)}
                {this.props.btnName &&(<button onClick={this.props.click} className="btn-info-window">{this.props.btnName}</button>)}
            </div>
        )
    }
}

export default ViewInfoWindow