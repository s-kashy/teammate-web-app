import React, { PureComponent } from 'react';
import { KEY } from "./apiKey"

import './MapContainer.css'
/* global google */
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class MapContainer extends PureComponent {

componentDidMount(){

}

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
    
        let arrayOfMarker
        if (this.props.markers){
            arrayOfMarker = this.props.markers.map((item, index) => {
            return (
                <Marker position={{ lat: item.lat, lng: item.lng }} key={index}
                    index={index}
                    onClick={this.onClickMarkerHandler}
                 
                    name={item.title} title={item.title} />

            )
        })
    }
        return (
            <div className={this.props.mapWindow}>
                {this.state.reRender && (<Map
                ref={x=>this.map=x}
                    google={this.props.google}
                    style={this.props.styleMap}
                    zoom={11}
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