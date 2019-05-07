import React from "react"
import "./ConformUserSelection.css"
const ConformUserSelection=(props)=>{
    let visibilityState = props.visible ? "block" : "none";
    return (
        <div
            style={{ display: visibilityState }}
            className="wrapper-conform">
            <p className="msg-conform">Are You Sure About Your Selection  </p>
          
            <button className="conform-btn" onClick={props.submit}>Submit</button>
            <button className="cancel-conform-btn" onClick={props.cancel}>Cancel</button>
        </div>
    );
}
export default ConformUserSelection