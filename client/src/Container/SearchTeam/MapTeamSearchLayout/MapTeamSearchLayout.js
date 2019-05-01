import React, { Component } from "react"
import "./MapTeamSearchLayout.css"
import MapContainer from '../../MapContainer/MapContainer'
import { connect } from "react-redux"
import * as actionType from "../../../Store/actions/index"
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
        this.props.setLocationUser(addressLoaded.results[0].geometry.location)
        this.props.findTeamsByParams()
    }
    viewTeamHandler = (team) => {
   
        this.props.viewTeamToJoin(team)
        this.props.displayTeam(team._id)
    }
    changeAddress = () => { }
    render() {
        let styleMap = {
            overflow: 'hidden',
            width: '50%',
            height: "50%"

        }
        if (this.state.screenWidth !== undefined && this.state.screenWidth < 800) {
            styleMap = {
                position: 'absolute',
                left: '-5px',
                right: '0px',
                bottom: '0px',
                top: '425px',
                overflow: 'hidden',
                width: '100%',
                zIndex: "-999",
                display: 'inherit',

            }

        }

        let styeSearch = {
            position: "relative",
            margin: " 10px auto",
            left: "97px",
            top: "20px",
        }
        return (<div>{this.state.isLoading ? <div>
            <div className='map-team-search'>
                <MapContainer styleMap={styleMap}
                    lat={this.props.userLocation.lat}
                    lng={this.props.userLocation.lng}
                    mapWindow="map-window-search"
                    viewTeam={this.viewTeamHandler}
                    teamsBySearch={this.props.teamsBySearch} />
            </div>
            <div className="search-bar-team-search">
                <SearchBar change={this.changeAddress}
                    searchStyle={styeSearch}
                    onPlaceLoaded={this.onPlaceLoaded} />
            </div>
        </div>
            : null}</div>)
    }
}
const mapStateHandler = state => {
    return {
        userLocation: state.teamCreateInfo.userLocation,
        teamsBySearch: state.teamCreateInfo.teamsBySearch
    }
}
const mapStateDispatch = dispatch => {
    return {
        setLocationUser: (location) => dispatch(actionType.setLocationUser(location)),
        viewTeamToJoin: (team) => dispatch(actionType.viewTeamToJoin(team))
    }
}
export default connect(mapStateHandler, mapStateDispatch)(MapTeamSearchLayout)