import React from "react"

import "./CheckBox.css"

const CheckBox = (props) => {
    return (<div  className={props.classCheckbox}>
        <input onClick={props.click} type="checkbox" name={props.name} id={props.name}  value={props.value} checked={props.value} />
        <label htmlFor={props.name}>{props.name}</label>

    </div>)
}


export default CheckBox