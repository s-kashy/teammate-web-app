import React from "react"
import "./SearchBar.css"
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCFwY5ZS7tlM5rgMHHHEshytZWqEn3-ZOE")
/* global google */
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;

  }
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
      { "types": ["geocode"] });

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    Geocode.fromAddress(place.formatted_address).then(res => {
      this.props.onPlaceLoaded(res)
    
    }).catch(err => {
      this.props.onPlaceLoaded(400)
   
    })

  }



  render() {
    return (
      <div style={this.props.searchStyle}>
        <input ref={this.autocompleteInput} className="inputSearch" placeholder="Eneter " id="autocomplete" type="text" />

      </div>
    );
  }
}
export default SearchBar