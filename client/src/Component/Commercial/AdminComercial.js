import React, { Component } from "react";
import "./AdminComercial.css";
class AdminCommercial extends Component {
  state = {
    isLoading: false
  };
 
  onLoadedImage=()=>{
    this.setState({ isLoading: true });
  }
  render() {
    const style = this.state.isLoading ? {} : {visibility: 'hidden'}
    return (
      <div className="wrapper-mobile">
        <div style={style}>
          <img className="img-commercial" onLoad={this.onLoadedImage} alt="com" 
           src="https://res.cloudinary.com/diyrxbb9o/image/upload/v1557569847/basketball.jpg"/>
           <div className="wrapper-text">
            <span className="text1">Coming Soon!!!</span>
            <span className="text2">TeamMate Basketball tournament</span>
            </div>
            </div>
       
      </div>
    );
  }
}
export default AdminCommercial;
