"use strict";

import React from 'react'
import {Link} from 'react-router'
import CaculateDistance from '../../api/services/calculateDistanceBetween'
import {RaisedButton, IconButton, ToolbarSeparator, CircularProgress} from 'material-ui';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

import {default as ScriptjsLoader} from "react-google-maps/lib/async/ScriptjsLoader";
import $ from "jquery";

const toolbarHeight = 64;
let timeoutToSearch;
let skipViewportFitBound = false;
let _googleMapComponent;

export default class RichMap extends React.Component{  

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: 400
    };
    this.initMap = this.initMap.bind(this)
    this.resize = this.resize.bind(this)
    this.handleDragSearch = this.handleDragSearch.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleZoomChanged = this.handleZoomChanged.bind(this)
  }

  _buildBounds(viewport) {
    var bounds = new google.maps.LatLngBounds();

    bounds.extend(new google.maps.LatLng(
        viewport.northeast.lat, viewport.northeast.lng));

    bounds.extend(new google.maps.LatLng(
        viewport.southwest.lat, viewport.southwest.lng));

    return bounds
  }

  componentDidMount() {
    let thiz = this;
    this.resize();
    $(window).resize(function() {
      thiz.resize();
    });
  }

  componentDidUpdate() {

    if (skipViewportFitBound)
      return true; 
    const map = this._googleMapComponent;

    if (!map)
      return false;
    const center = map.getCenter();
    const viewport = this.props.viewport;

    /*console.log({
        lat: center.lat(),
        lng: center.lng()
      }, viewport)*/

    if (!map || !viewport)
      return true

    

    map.fitBounds(this._buildBounds(viewport));

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

  handleZoomChanged() {
    console.log('zoom changed');
  }

  handleDragStart() {
    clearTimeout(timeoutToSearch);
    skipViewportFitBound = true;
  }

  handleDragSearch() {

    const map = this._googleMapComponent; 

    /*console.log('dragged to', {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    });*/

    this.props._changeMapCenter({
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    });

    clearTimeout(timeoutToSearch);
    const that = this;
    timeoutToSearch = setTimeout(() => {
      const center = map.getCenter();

      const lat0 = map.getBounds().getNorthEast().lat();
      const lng0 = map.getBounds().getNorthEast().lng();

      /*console.log('bound',{
        lat: lat0,
        lng: lng0
      });*/

      /*var bounds2 = map.getBounds();
      var center2 = map.getCenter();
      if (bounds2 && center2) {
        var ne = bounds2.getNorthEast();
        // Calculate radius (in meters).
        var radius2 = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
        //console.log('radius2', radius2/1000);
      }*/

      const radius = Math.floor(CaculateDistance(lat0, lng0, center.lat(), center.lng(), 'K') * 100)/100;

      that.props._changeMapCenterSearch({
        lat: center.lat(),
        lng: center.lng()
      }, radius);

      skipViewportFitBound = false;
    }, 500)
    
  }

  

  initMap(map) {
    this._googleMapComponent = map
    console.log('map inited', this.props.viewport);

    if (this.props.viewport && map)
      map.fitBounds(this._buildBounds(this.props.viewport));

  }

  render() {

    let markers = undefined;

    if (this.props.markers) {
      markers = (
        this.props.markers.map((marker, index) => {
          //console.log('marker', marker);
          const props = {
            key: marker._id,
            icon: '/images/icon_mini.png',
            position: {
              lat: marker.location.coordinates[1],
              lng: marker.location.coordinates[0]
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
              defaultZoom={5}
              mapTypeId={"roadmap"}
              center={this.props.center}
              onZoomChanged={this.handleZoomChanged}
              onDragstart={this.handleDragStart}
              onDragend={this.handleDragSearch}>
              {markers}
            </GoogleMap>
          } />
      </section>
    )
  }
}

