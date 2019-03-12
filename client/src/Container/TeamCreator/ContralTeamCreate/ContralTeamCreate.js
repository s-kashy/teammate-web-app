import React from "react"

import "./ContralTeamCreate.css"
const ContralTeamCreate=(props)=>{
return(<div className={props.class}>
    <button className="previous-btn-team-create" onClick={props.leftClick}>Previous</button> 
   <button className="next-btn-team-create" onClick={props.rightClick}>Next</button>
</div>)
}
export default ContralTeamCreate