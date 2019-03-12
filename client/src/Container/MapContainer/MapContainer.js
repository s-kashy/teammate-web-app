import React, { Component } from 'react';
import { KEY } from "./apiKey"

import './MapContainer.css'
/* global google */
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class MapContainer extends Component {
    constructor(props) {

        super(props)
        this.state = {
            activeMarker: null,
            selectedPlace: "",
            showingInfoWindow: false,
            reRender: true,
            userInfo: {
                lat: this.props.lat,
                lng: this.props.lng,
                markers: this.props.markers
            }
        }
    }



    onClickMarkerHandler = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }

    render() {
        const { lat, lng } = this.state.userInfo
     
        let arrayOfMarker = this.props.markers.map((item, index) => {
            return (
                <Marker position={{ lat: item.lat, lng: item.lng }} key={index}
                    index={index}
                    onClick={this.onClickMarkerHandler}
                    label={"You"}
                    name={item.title} title={item.title} />

            )
        })
        return (
            <div>
                {this.state.reRender && (<Map
                    google={this.props.google}
                    style={this.props.styleMap}
                    zoom={10}
                    center={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    initialCenter={{
                        lat: 32.109333,
                        lng: 34.855499
                    }}>
                    {arrayOfMarker}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </Map>)}
            </div>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: (KEY)
})(MapContainer)