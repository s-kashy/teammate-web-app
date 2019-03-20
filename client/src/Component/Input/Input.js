import React from "react"
import "./Input.css"

const Input = (props) => {
    return (<div >
        <label className={props.classLabel}>{props.title}</label>
        <input type={props.type} name={props.name} autocomplete={props.autocomplete} placeholder={props.placeholder}
         className={props.classInput} min={props.min} disabled={props.disabled}
        id={props.id} value={props.value} onChange={props.change} />
    
        {props.error && <p className={props.errorClass?props.errorClass:"error-msg-input"}>{props.msgError=="" || props.msgError==undefined ? "This field is required*":props.msgError}</p>}
    </div>)
}
export default Input