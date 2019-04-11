import React from "react";
import "./YouAreAMember.css"

const YouAreAMember = props => {
    let visibilityState = props.visible ? "block" : "none";
    return (
        <div
            style={{ display: visibilityState }}
            className="ErrorMsg"
        >
            <p>You Are A Member already of the team </p>
            <button onClick={props.click} className="btn-error">OK</button>
        </div>
    );
};
export default YouAreAMember;