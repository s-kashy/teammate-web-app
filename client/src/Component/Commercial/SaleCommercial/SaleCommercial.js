import React, { Component } from "react";
import "./SaleCommercial.css";

class SaleCommercial extends Component {
  state = {
    isLoading: false
  };
  onLoadedHandler = () => {
    this.setState({ isLoading: true });
  };
  render() {
    return (
      <div className="wrapper-sale">
        <div className="container">
          <div className="box">
            <div className="imgBx">
              <img
                alt="add"
                onLoad={this.onLoadedHandler}
                src="https://res.cloudinary.com/diyrxbb9o/image/upload/c_scale,h_400,r_0/v1557936134/http___pluspng.com_img-png_sale-free-download-png-png-image-200.png"
              />
            </div>
            <div className="content">
              <h3 className="title-sale">Sports equipment</h3>
              <p className="point-sale">Shoes men and women 30% off</p>
              <p className="point-sale">Tennis racket 10% off all sizes</p>
              <p className="point-sale"> Summer cloths great deals </p>
              <p className="point-sale">come and see for yourself</p>
              <h1 style={{color:'#fff'}}>TeamMate</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SaleCommercial;
