import React, { Component } from "react"
import "./MapTeamSearchLayout.css"
import MapContainer from '../../MapContainer/MapContainer'
import SearchBar from "../../TeamCreator/SearchBar/SearchBar"


class MapTeamSearchLayout extends Component {
    state = {
        isLoading: true,
        screenWidth: ""
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
        this.setState({ isLoading: false })
    }

    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth }, () => {

        });
    }
  
    onPlaceLoaded = (addressLoaded) => {

    }
    changeAddress = () => { }
    render() {
        let styleMap = {
            overflow: 'hidden',
            width: '50%',
            height: "100%"

        }
        if (this.state.screenWidth !== undefined && this.state.screenWidth < 800) {
            styleMap = {
                position: 'absolute',
                left: '0px',
                right: '0px',
                bottom: '0px',
                top: '425px',
                overflow: 'hidden',
                width: '100%',
                zIndex:"-999",
                display: 'inherit',

            }

        }

        let styeSearch = {
            position: 'relative',
            margin: '10px auto',
            top: '40px',
            left: '147px',
        }
        return (<div>{this.state.isLoading ? <div>
            <div className='map-team-search'>
                <MapContainer styleMap={styleMap} mapWindow="map-window-search" />
            </div>
            <div className="search-bar-team-search">
                <SearchBar change={this.changeAddress} searchStyle={styeSearch} onPlaceLoaded={this.onPlaceLoaded} />
            </div>
        </div>
            : null}</div>)
    }
}

export default MapTeamSearchLayout