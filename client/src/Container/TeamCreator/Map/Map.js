import React, { Component } from 'react';
import './Map.css'
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete"
class Map extends Component{

    render(){
return(

    <div>
        <PlacesAutocomplete/>
    </div>
)
    }
}
export default Map