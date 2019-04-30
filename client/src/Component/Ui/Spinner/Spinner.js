import React from "react"
import "./Spinner.css"

const Spinner=()=>{
    return(
        <div className="main-wrapper-spinner">
        <p className="msg-spinner">TeamMate Is Loading....</p>
        <div className="loader"></div>
        </div>
    )
}
export default Spinner