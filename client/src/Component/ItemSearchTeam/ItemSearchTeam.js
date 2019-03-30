import React from "react"
import "./ItemSearchTeam.css"
const ItemSearchTeam = (props) => {
    return (
        <div className="item-search-team-wrapper">
            <div className="img-item-wrapper">
                <img src="https://res.cloudinary.com/diyrxbb9o/image/upload/v1553006690/action-beach-fun-416676.jpg" alt="item-team" />
            </div>
            <div className="item-info-wrapper">
                <h4>name of team</h4>
                <p>categorie</p>
                <p>type of meet</p>
            </div>
            <div className="btn-item-wrapper">
            <button className="btn-team-item">View</button>
             </div>

        </div>
    )
}
export default ItemSearchTeam