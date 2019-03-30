import React, { Component } from "react"
import "./MapTeamSearchLayout.css"
import MapContainer from '../../MapContainer/MapContainer'
import SearchBar from "../../TeamCreator/SearchBar/SearchBar"
import { relativeTimeRounding } from "moment";

class MapTeamSearchLayout extends Component {
    render() {
        let styleMap = {
            overflowX: 'hidden',
            width: '50%',
            height: "70%"

        }
        let styeSearch = {
            position: 'relative',
            margin: '10px auto',
            top: '40px',
            left: '147px',
        }
        return (<div>
            <MapContainer styleMap={styleMap} />
            <SearchBar searchStyle={styeSearch} />

        </div>)
    }
}

export default MapTeamSearchLayout