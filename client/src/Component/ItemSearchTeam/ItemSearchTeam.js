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
            <div onClick={props.view} className="fab">&#43;</div>
                <div>
                    <h3 className="type-of-date-item-search">Type of Sport {props.sportType}</h3>
                    <p>{props.nameOfTeam}</p>
                    <p className="about-item-search">{props.about}</p>
                </div>


            </div>
            
        </div>
    )
}
export default ItemSearchTeam