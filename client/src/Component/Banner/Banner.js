import React, { Component } from "react";
import "./Banner.css";
class Banner extends Component {
  componentDidMount() {
    this.setState({ isLoading: true });
  }
  state = {
    isLoading: false
  };
  render() {
    return (
      <div className="banner-wrapper">
        {this.state.isLoading && (
          <video
            controls={false}
            width="100%"
            height="250"
            preload="auto"
            autoPlay
            loop
          >
            <source src="https://res.cloudinary.com/diyrxbb9o/video/upload/v1556868840/Beach-Ball.mp4" />
          </video>
        )}
      </div>
    );
  }
}
export default Banner;
