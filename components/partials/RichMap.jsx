"use strict";

import React from 'react'
import {Link} from 'react-router'
import {RaisedButton, IconButton, ToolbarSeparator, CircularProgress} from 'material-ui';
import {GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import NodeGeoCoder from 'node-geocoder'

import {default as ScriptjsLoader} from "react-google-maps/lib/async/ScriptjsLoader";
import $ from "jquery";

const geocoder = NodeGeoCoder('google', 'https');

const toolbarHeight = 64;

export default class RichMap extends React.Component{  

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: 400,
      mapCenter: {
        lat: -9.189966999999998, 
        lng: -75.015152
      }
    };
    this.initMap = this.initMap.bind(this)
    this.changeMapCenter = this.changeMapCenter.bind(this)
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    let thiz = this;
    this.resize();
    $(window).resize(function() {
      thiz.resize();
    });
  }

  componentWillUnmount() {
    $(window).off("resize");
  }

  resize() {
    const newSize = $(window).height() - toolbarHeight;
    this.setState({
      height: newSize
    })
  }

  changeMapCenter(newCenter) {
    this.setState({
      mapCenter: newCenter
    })
  }

  initMap(map) {
    console.log('map', map);
    console.log('google', google);
  }

  render() {

    let markers = undefined;

    if (this.props.markers) {
      markers = (
        this.props.markers.map((marker, index) => {
          //console.log('marker', marker);
          const props = {
            key: marker._id,
            position: {
              lat: marker.location.coordinates[0],
              lng: marker.location.coordinates[1]
            }
          }
          return (
            <Marker 
              {...props}/>
          );
        })
      )
    }

    return (
      <section className="richmap" style={{height: this.state.height}}>
        <ScriptjsLoader
          hostname={"maps.googleapis.com"}
          pathname={"/maps/api/js"}
          query={{v: "3.${ AsyncGettingStarted.version }", libraries: "geometry,drawing,places"}}
          loadingElement={
            <div />
          }
          containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
              }} />
          }
          googleMapElement={
            <GoogleMap
              ref={this.initMap}
              defaultZoom={4}
              mapTypeId={"roadmap"}
              defaultCenter={{lat: -9.189966999999998, lng: -75.015152}} 
              center={this.state.mapCenter}>
              {markers}
            </GoogleMap>
          } />
      </section>
    )
  }
}

