import React from "react"
import "./ItemSearchTeam.css"
const ItemSearchTeam = (props) => {
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
                <div>
                    <p className="type-of-date-item-search">{props.sportType}</p>
                    <button onClick={props.view} className="btn-view-search-team" disabled={props.fade}>{props.title}</button>
                </div>


            </div>
        </div>
    )
}
export default ItemSearchTeam