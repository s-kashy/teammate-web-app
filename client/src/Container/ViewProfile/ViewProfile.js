import React, { Component } from "react"

import "./ViewProfile.css"

class ViewProfile extends Component {

    render() {
        return (<div className="box-profile-view">
            <div className="card-view-profile">
                <div className="image-profile-view">
                    <img src={require('../../assest/Person-Male-Light-icon.png')} />
                </div>

                <h3>Shlomo kashy</h3>
                <article>ext ever since the 1500s, when an unknown
                 printer took a galley of type and scrambled it to make
                 a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining essentially
                  unchanged. It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with desktop
                 publishing software like Aldus PageMaker
             including versions of Lorem Ipsum</article>
                <ul className="sport-interest">
                    <li><span><i className="fas fa-diamond"></i></span> yoga</li>
                    <li><span><i className="fas fa-diamond"></i></span> soccer</li>
                    <li><span ><i className="fas fa-diamond"></i></span> running</li>
                </ul>

            </div>
        </div>)
    }
}
export default ViewProfile