import React from "react";
import "./ErrorMsg.css"

const ErrorMsg = props => {
    let visibilityState = props.visible ? "block" : "none";
    return (
        <div
            style={{ display: visibilityState }}
            className="ErrorMsg"
        >
            <p>Something went wrong we are sorry </p>
            <button onClick={props.click} className="btn-error">OK</button>
        </div>
    );
};
export default ErrorMsg;
