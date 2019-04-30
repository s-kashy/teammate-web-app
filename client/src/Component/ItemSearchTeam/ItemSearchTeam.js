import React from "react"
import "./ItemSearchTeam.css"
import { findTheNextEvent } from "./compareDates"
const ItemSearchTeam = (props) => {
    console.log(props.dateType, props.dateEvent)
    let nextEvent = findTheNextEvent(props.dateType, props.dateEvent)

    let disabledMode = null
    if (props.fade) {
        disabledMode = {
            opacity: '0.6',
        }
    }
    return (
        <div className="item-search-team-wrapper" style={disabledMode}>
            {props.fade && <div className="team-full-item-search"><span style={{ color: "black", margin: "0", padding: "0" }}><strong>This team is full</strong></span></div>}
            <div className="img-item-wrapper">
                <img className="img-item-search" src={props.image} alt="item-team" />
            </div>
            <div className="item-info-wrapper">
                <div onClick={props.view} className="fab">&#43;</div>
                <div>
                    <h3 className="type-of-date-item-search">{props.sportType}</h3>
                    <p>{props.nameOfTeam}</p>
                    <div >
                        <span className="amount-in-team">members in the team {props.signUpMembers}/{props.maxMembers} </span>
                        <span className="next-event-in-team">{`upcoming event ${nextEvent}`}</span>
                    </div>
                </div>


            </div>

        </div>
    )
}
export default ItemSearchTeam