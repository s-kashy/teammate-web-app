import React, { PureComponent } from 'react';
import ReactDOM from "react-dom"
import { KEY } from "./apiKey"
import ViewWindowInfo from "./ViewInfoWindow/ViewInfoWindow"

import './MapContainer.css'
/* global google */
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends PureComponent {

    componentDidMount() {

    }

    constructor(props) {
        super(props)
        this.state = {
            activeMarker: null,
            selectedPlace: "",
            showingInfoWindow: false,
            reRender: true,
            userInfo: {
                lat: this.props.lat ? this.props.lat : 32.109333,
                lng: this.props.lng ? this.props.lng : 34.855499,
                markers: this.props.markers
            }
        }
        this.windowInfo = React.createRef

    }
    clickWindowHandler = (event) => {
        event.preventDefault()
        console.log("click")
    }
    onClickMarkerHandler = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }
    onInfoWindowOpen = (props, e) => {
        if (this.props.teamsBySearch) {
            const { title, value } = this.state.selectedPlace
            const ViewWindow = (<div><ViewWindowInfo type={value.dateAndTime.pickType}
                name={title} click={this.clickWindowHandler}
                btnName="View" /></div>);
            ReactDOM.render(React.Children.only(ViewWindow), document.getElementById("iwc"));
        } else {
            const ViewWindow = (<div><ViewWindowInfo
                name={this.props.markers[0].title} /></div>);
            ReactDOM.render(React.Children.only(ViewWindow), document.getElementById("iwc"));
        }
    }
    render() {
        const { lat, lng } = this.state.userInfo
        let arrayOfMarker
        if (this.props.markers) {
            arrayOfMarker = this.props.markers.map((item, index) => {
                return (
                    <Marker position={{ lat: item.lat, lng: item.lng }}
                        key={index}
                        index={index}
                        onClick={this.onClickMarkerHandler}
                        name={item.title} title={item.title} />
                )
            })
        } else if (this.props.teamsBySearch) {
            arrayOfMarker = this.props.teamsBySearch.map((item, index) => {
                return (
                    <Marker position={{ lat: item.location.userLocation.lat, lng: item.location.userLocation.lng }}
                        key={index} id={item._id} onClick={this.onClickMarkerHandler} value={item}
                        name={`${item.generalInfo.typeOfSportChosen}`} title={`${item.generalInfo.typeOfSportChosen}`} />
                )
            })
        }

        return (
            <div className={this.props.mapWindow}>
                {this.state.reRender && (<Map
                    ref={x => this.map = x}
                    google={this.props.google}
                    style={this.props.styleMap}
                    zoom={11}
                    center={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    initialCenter={{
                        lat: lat,
                        lng: lng
                    }}>
                    {arrayOfMarker}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onOpen={e => {
                            this.onInfoWindowOpen(this.props, e);
                        }}>
                        <div id="iwc">

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