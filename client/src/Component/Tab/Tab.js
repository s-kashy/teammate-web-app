import React from "react"
import "./Tab.css"
const Tab=(props)=>{
    return(<div style={{display:"inline-block",marginLeft:"10px"}}>
    <input type="radio" name={props.name} id={props.name} className="tab"/>
        <label className="tab-label" htmlFor={props.name} >{props.label} </label>
    </div>)
}
export default Tab