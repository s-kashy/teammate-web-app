import React from "react"
import "./Input.css"

const Input = (props) => {
    return (<div>
        <label className={props.classLabel}>{props.title}</label>
        <input type={props.type} name={props.name} placeholder={props.placeholder}
         className={props.classInput} min={props.min}
        id={props.id} value={props.value} onChange={props.change} />
        
        {props.error && <p className="error-msg-input">This field is required*</p>}
    </div>)
}
export default Input