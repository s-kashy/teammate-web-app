import React, { Component } from "react"
import MapContainer from "../../../MapContainer/MapContainer"
import SearchBar from "../../SearchBar/SearchBar"
import { connect } from "react-redux";
import * as actionType from "../../../../Store/actions/index"
import ContralTeamCreate from '../../ContralTeamCreate/ContralTeamCreate'
import "./MapSearchLayout.css"
class MapSearchLayout extends Component {
    componentDidMount() {
        if (this.props.location !== "") {
            let userInfo = JSON.parse(JSON.stringify(this.state.userInfo))
            userInfo.userLocation = this.props.location.userLocation
            userInfo.formattedAddress = this.props.location.formattedAddress
            userInfo.marker = JSON.parse(JSON.stringify(this.props.location.marker))
            this.setState({ userInfo: userInfo, isLoading: true, isValid: true }, () => {

            })
        }
        else {
            this.setState({ isLoading: true })
        }


    }
    componentWillUnmount() {
        this.setState({ isLoading: false })
    }
    state = {
        isValid: false,
        isLoading: false,
        userInfo: {
            userLocation: {
                lat: "",
                lng: ""
            },
            formattedAddress: "",
            marker: [],
            errorMsg: false
        }
    }
    onChangeHandler = () => {
        this.setState({ isValid: false })

    }
    onPlaceLoaded = (place) => {
        if (place === 400) {
            this.setState({ errorMsg: true })
        }
        else {
            const { lat, lng } = place.results[0].geometry.location;
            const { formatted_address } = place.results[0]
            let userInfo = JSON.parse(JSON.stringify(this.state.userInfo))
            userInfo.userLocation.lat = lat
            userInfo.userLocation.lng = lng
            let tempMarker = [{
                lat: lat,
                lng: lng,
                title: `TeamMate MeatUp ${formatted_address}`,


            }]

            userInfo.errorMsg = false
            userInfo.marker = tempMarker
            userInfo.formattedAddress = formatted_address
            this.setState({ userInfo: userInfo, isValid: true }, () => {
                this.props.saveLocation(this.state.userInfo)
            })


        }


    }

    render() {
        const { userInfo, isValid } = this.state

        const { userLocation } = userInfo
        let styleMap = {
            height: '100%',

        }
        let styleSearch = {
            position: 'relative',
            margin: '40px auto',
        }

        return (
            <div>
                {this.state.isLoading ? <div className="search-map-layout" >
                    <div className="map-child-flex-layout">
                        <MapContainer styleMap={styleMap}
                            lat={userLocation.lat} lng={userLocation.lng}
                            markers={userInfo.marker} />
                    </div>
                    <div className="search-child-flex-layout">
                        <SearchBar searchStyle={styleSearch} onPlaceLoaded={this.onPlaceLoaded} address={userInfo.formattedAddress} change={this.onChangeHandler} />
                        {userInfo.errorMsg && <div>Error occurred In Finding the Address please try Again</div>}
                    </div>
                    <ContralTeamCreate class="contral-team-map-layout" disabled={!isValid} leftClick={this.props.leftClick} rightClick={this.props.rightClick} />
                </div>:null}

            </div>

        )
    }
}
const mapStateHandler = state => {
    return {
        location: state.teamCreateInfo.location,
    };
};
const mapStateDispatch = dispatch => {
    return {
        saveLocation: (location) => dispatch(actionType.saveLocation(location)),


    };
};

export default connect(mapStateHandler, mapStateDispatch)(MapSearchLayout)