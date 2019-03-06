import React from "react"
import "./OptionMenu.css"


const OptionMenu = (props) => {
    let arrayOption = props.array.map((item,index) => {
        return (<option key={index} 
         id={index}
        name={item} value={item}>{item}</option>)
    })

    return (
        <div className="select"  >
            <select defaultValue={arrayOption[0]} onClick={(event)=>props.click(event)}>
                {arrayOption}
            </select>

        </div>
    )
}
export default OptionMenu