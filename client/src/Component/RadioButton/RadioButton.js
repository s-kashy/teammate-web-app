import React from "react"
import "./RadioButton.css"
const RadioButton=(props)=>{
return(
<div className={props.classRadio}>
 <input type="radio" id={props.id} name={props.name}
  onClick={props.click} checked={props.checked} />
 <label htmlFor={props.id}>{props.label}</label>
 </div>
)
}



export default RadioButton