import React, { Component } from "react"
import "./MapTeamSearchLayout.css"
import MapContainer from '../../MapContainer/MapContainer'
import SearchBar from "../../TeamCreator/SearchBar/SearchBar"


class MapTeamSearchLayout extends Component {
    componentWillUnmount() {
        this.setState({ isLoading: false })
    }
    state = {
        isLoading: true
    }
    render() {
        let styleMap = {
            overflow:'hidden',
            width: '100%',
            height: "100%"

        }
        let styeSearch = {
            position: 'relative',
            margin: '10px auto',
            top: '40px',
            left: '147px',
        }
        return (<div>{this.state.isLoading ? <div>
            <MapContainer styleMap={styleMap} />
            <SearchBar searchStyle={styeSearch} />
        </div>
            : null}</div>)
    }
}

export default MapTeamSearchLayout