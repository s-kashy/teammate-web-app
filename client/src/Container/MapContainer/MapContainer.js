import React, { Component } from 'react';
import {KEY} from "./apiKey"
import './MapContainer.css'
/* global google */
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class MapContainer extends Component {
    state = {
        indexInfoWindow: null,
        activeMarker: null,
        reRender: true,
        userInfo: {
            lat: 32.109333,
            lng: 34.855499,
            markers: []
        }
    }
    componentWillMount() {

    }

    componentWillReceiveProps(nextState) {

        const { userInfo } = this.state

        if (userInfo.lat != nextState.lat
            || userInfo.lng != nextState.lng) {
            this.setState({ reRender: false }, () => {
                let userInfoCopy = JSON.parse(JSON.stringify(this.state.userInfo))
                userInfoCopy.lat = nextState.lat
                userInfoCopy.lng = nextState.lng
                userInfoCopy.markers = nextState.markers
                this.setState({ userInfo: userInfoCopy, reRender: true }, () => {

                })
            })


        }
    }
    onClickMarkerHandler = (marker) => {

        console.log(marker.index)
        this.setState({ indexInfoWindow: marker.index, activeMarker: marker }, () => {
            console.log(this.state.indexInfoWindow)
        })
    }
    render() {
        const { indexInfoWindow } = this.state
        const { lat, lng } = this.state.userInfo
        let arrayOfMarker = this.state.userInfo.markers.map((item, index) => {
            return (<Marker position={{ lat: item.lat, lng: item.lng }} key={index}
                index={index}
                onClick={this.onClickMarkerHandler}
                name={item.title} title={item.title} >
               <InfoWindow visible={true} position={{ lat: this.state.userInfo.lat, lng: this.state.userInfo.lng }}  options={{pixelOffset: new google.maps.Size(0,-30)}} >
                    <div >
                        <h2>{item.title}</h2>
                    </div>
                </InfoWindow>
            </Marker>)
        })
        return (
            <div>
                {this.state.reRender && (<Map
                    google={this.props.google}
                    style={this.props.styleMap}
                    zoom={10}

                    initialCenter={{
                        lat: lat,
                        lng: lng
                    }}>
                    {arrayOfMarker}
                 
                </Map>)}
            </div>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: (KEY)
})(MapContainer)