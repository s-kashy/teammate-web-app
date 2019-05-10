import React, { Component } from "react";
import "./RatingBar.css";
import StarRatings from "react-stars";
class RatingBar extends Component {
  state = {
    rating: this.props.rate?this.props.rate:0,
    displayBar: false
  };
  componentDidMount() {
    this.setState({ rating: this.props.rate });
  }
  shouldComponentUpdate(){
    return this.state.rating ===this.props.rate
  }
  changeRating = newRating => {
    this.setState({ rating: newRating });
    this.props.clickRating(newRating);
  };
  render() {
    console.log("edit", this.props.edit);
    return (
      <div className="rating-stars-wrapper">
        <p className="msg-rating-star">{this.props.title}</p>
        <StarRatings
          value={this.props.rate}
          onChange={this.changeRating}
          count={5}
          edit={this.props.edit}
          className={this.props.classRating}
          color2={"#ffd700"}
          size={24}
          half={false}
          name="rating"
        />
      </div>
    );
  }
}

export default RatingBar;
