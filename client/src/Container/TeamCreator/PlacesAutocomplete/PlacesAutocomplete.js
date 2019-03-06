import React, { Component } from "react"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: ""
        }
    }
    handleChange = (address) => {
        this.setState({ address: address })
    }
    render() {
        return (<div>
    <PlacesAutocomplete >


    </PlacesAutocomplete>


        </div>)
    }

}
export default LocationSearchInput