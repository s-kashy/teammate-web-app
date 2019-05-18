import React from "react"
import "./OptionMenu.css"


const OptionMenu = (props) => {
   
    let arrayOption = props.array.map((item, index) => {
        return (<option key={index}
            id={index}
            // selected={item===props.selected}
            name={item} value={item}>{item}</option>)
    })
 
    return (
        <div className="selectOp" value={props.selected}>
            <select style={{bottom:"0%"}} 
             onChange={(event) => props.click(event)}>
                {arrayOption}
            </select>

        </div>
    )
}
export default OptionMenu