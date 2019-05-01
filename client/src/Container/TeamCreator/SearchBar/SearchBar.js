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
    this.autoCompleteInput = React.createRef();
    this.autocomplete = null;

  }
  onChangeHandler = (event) => {
    this.props.change()
    let userInfo = JSON.parse(JSON.stringify(this.state.value))
    userInfo = event.target.value
    this.setState({ value: userInfo })
  }
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autoCompleteInput.current,
      { "types": ["geocode"] });

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);

  }

  handlePlaceChanged = () => {
    const place = JSON.parse(JSON.stringify(this.autocomplete.getPlace()));
    Geocode.fromAddress(place.formatted_address).then(res => {
      this.props.onPlaceLoaded(res)
      this.setState({ value: "" })
    }).catch(err => {
         this.props.onPlaceLoaded(400)
      this.setState({ value: "" })

    })

  }


  render() {

    return (
      <div style={this.props.searchStyle} className="wrapper-auto">
        <input ref={this.autoCompleteInput} autoComplete="on"
          onChange={(e) => this.onChangeHandler(e)}
          placeholder={this.props.address ? this.props.address:"Enter a address"}
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
export default SearchBar