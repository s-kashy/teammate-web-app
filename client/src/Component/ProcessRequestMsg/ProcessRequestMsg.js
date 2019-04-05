import React from "react"

const ProcessRequestMsg = (props) => {
    let visibilityState = props.visible ? "block" : "none";
    return (
        <div
            style={{ display: visibilityState }}
            className="ErrorMsg"
        >
            <p>we are Processing your request it will only take a few secondes </p>
        </div>
    );
}

export default ProcessRequestMsg