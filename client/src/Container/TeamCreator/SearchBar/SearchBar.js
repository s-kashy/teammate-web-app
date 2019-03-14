import React from "react"
import "./SearchBar.css"

import Geocode from "react-geocode";
import { KEY } from "../../MapContainer/apiKey"
Geocode.setApiKey(KEY)
/* global google */
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;

  }
  onChangeHandler = (event) => {
    let userInfo = JSON.parse(JSON.stringify(this.state.value))
    userInfo = event.target.value
    this.setState({ value: userInfo })
  }
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
      { "types": ["geocode"] });

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);

  }

  handlePlaceChanged = () => {
    const place = JSON.parse(JSON.stringify(this.autocomplete.getPlace()));
    Geocode.fromAddress(place.formatted_address).then(res => {
      this.props.onPlaceLoaded(res)
      this.setState({ value: "" })
    }).catch(err => {
      console.log("hande search")
      this.props.onPlaceLoaded(400)
      this.setState({ value: "" })

    })

  }


  render() {
    return (
      <div style={this.props.searchStyle} className="wrapper-auto">
        <input ref={this.autocompleteInput} autocomplete="on"
          onChange={(e) => this.onChangeHandler(e)}
          placeholder="Enter City"
          className="searchTerm"
          value={this.state.value}
          type="text" />
        <button className="searchButton" >
          <i className="fa fa-search"></i>
        </button>


      </div>
    );
  }
}
export default  SearchBar