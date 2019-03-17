import React from "react"

import "./CheckBox.css"

const CheckBox = (props) => {
    return (<div  className={props.classCheckbox}>
        <input onChange={props.click} type="checkbox" style={props.override}name={props.name} id={props.name}  value={props.value}
         checked={props.value} />
        <label htmlFor={props.name} className={props.label}>{props.name}</label>

    </div>)
}


export default CheckBox