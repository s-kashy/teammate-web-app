import React from "react"
import "./IntroStep.css"

const IntroStep = (props) => {
    return (<div className="intro-create-team" >
        <h3>Welcome Message</h3>
        <div className="msg-intro-create">
            <p>text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
             but also the leap into electronic typesetting, remaining essentially
             unchanged. It was popularised in the 1960s with the release of Letraset
             sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsu</p>
        </div>
        <div className="btn-wrapper-intro">
            <button onClick={props.click} className="next-btn-intro">Start<span style={{ marginLeft: "3px" }}><i className="fas fa-arrow-right"></i></span></button>
        </div>
    </div>)
}
export default IntroStep