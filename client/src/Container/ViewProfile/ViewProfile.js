import React, { Component } from "react"
import Tab from "../../Component/Tab/Tab"
import "./ViewProfile.css"

class ViewProfile extends Component {
    state = {
        isMobile: false
    }
    componentDidMount() {
        if (this.profileForm.clientWidth <= 800) {
            this.setState({ isMobile: true })
        }

    }

    render() {
        return (
            <div>
                {this.state.isMobile ? <p>this is mobile </p> : <div ref={x => this.profileForm = x} className="wrapper-view-profile">
                <div className="tabs">
                <Tab name="View-Profile" label="View-Profile"/>
                <Tab name="View-Profile" label="Edit-Profile"/>
                </div>
                    <div className="blog-card">
                        <div className="title-content">
                            <h3><a href="3">shlomo kashy </a></h3>
                        </div>
                        <div className="card-info">  Lorem ipsum dolor
                         sit amet, consectetur adipisicing elit, sed do
                          eiusmod tempor incididunt ut
                          sit amet, consectetur adipisicing elit, sed do
                          eiusmod tempor incididunt ut
                          sit amet, consectetur adipisicing elit, sed 
                          sit amet, consectetur adipisicing elit, sed do
                          eiusmod tempor incididunt ut
                   labore et dolore magna aliqua. Ut enim ad minim...
                   <div>
                   <p>My interest are</p>
                   <ul>
            <li> <span className="licon"> <i class="far fa-dot-circle"></i></span>Hookey</li>
            <li> <span className="licon"> <i class="far fa-dot-circle"></i></span>Hookey</li>
            <li> <span className="licon"> <i class="far fa-dot-circle"></i></span>Hookey</li>
            <li> <span className="licon"> <i class="far fa-dot-circle"></i></span>Hookey</li>
            <li> <span className="licon"> <i class="far fa-dot-circle"></i></span>Hookey</li>
            <li> <span className="licon"> <i class="far fa-dot-circle"></i></span>Hookey</li> 
            </ul>
                   </div>
               </div>
               <div className="utility-list">
            
           
        </div>
                        <div className="gradient-overlay"></div>
                        <div className="color-overlay"></div>
                    </div>

                </div>}
            </div>)
    }
}
export default ViewProfile