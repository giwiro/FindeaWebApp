"use strict";

import _ from 'lodash'
import URI from 'urijs'
import React from 'react'
import RichMap from '../partials/RichMap.jsx'
//import MapMenu from '../partials/MapMenu.jsx'
import BuscarMenu from '../partials/BuscarMenu.jsx'
import EspaciosBusquedaStore from '../stores/EspaciosBusquedaStore'
import EspaciosBusquedaActionCreator from '../actions/EspaciosBusquedaActionCreator'

export default class BuscarPage extends React.Component {

	constructor(props) {
		super(props);
		EspaciosBusquedaStore.init(this.props.route.espaciosBusqueda);
    let initialState = {
      espacios: EspaciosBusquedaStore.getEspacios(),
      center: EspaciosBusquedaStore.getCenter(),
      viewport: EspaciosBusquedaStore.getViewport(),
      isLoading: false,
      usos: this.props.route.usos
    }
    let { query } = this.props.location;

    if (query.direccion) {
      initialState.direccion = query.direccion
    }

    if (query.uso) {
      const isValidUso = _.some(this.props.route.usos, {
        nombre: query.uso
      })
      if (isValidUso) {
        initialState.uso = query.uso
      }
    }

		this.state = initialState;

    this._searchPlaces = this._searchPlaces.bind(this);
		this._onChange = this._onChange.bind(this);
    this._changeMapCenter = this._changeMapCenter.bind(this);
    this._changeMapCenterSearch = this._changeMapCenterSearch.bind(this);
    this._changeUso = this._changeUso.bind(this);
    this._changeDireccion = this._changeDireccion.bind(this)

	}

	_onChange() {
		const espacios = EspaciosBusquedaStore.getEspacios();
    const isLoading = EspaciosBusquedaStore.isLoading();
    const center = EspaciosBusquedaStore.getCenter();
    const viewport = EspaciosBusquedaStore.getViewport();

    /*console.log('changed->espacios', espacios);
    console.log('changed->isLoading', isLoading);
    console.log('changed->center', center);
    console.log('changed->viewport', viewport);*/

    this.setState({
    	espacios: espacios,
      isLoading: isLoading,
      center: center,
      viewport: viewport
    });
  }

  _searchPlaces(direccion) {
    EspaciosBusquedaActionCreator.searchPlaces({
      direccion: direccion,
      uso: this.state.uso
    })

    this._changeDireccion(direccion)
  }

  _changeMapCenter(newCenter) {
    EspaciosBusquedaStore.setCenter(newCenter);
    /*this.setState({
      center: newCenter
    })*/
  }

  _changeMapCenterSearch(center, radius) {
    EspaciosBusquedaActionCreator.searchPlaces({
      center: center,
      radius: radius
    })
  }

  _changeDireccion(value) {
    if (window.history.pushState) {
      var newurl = URI(document.URL).query(_.merge(this.props.location.query, {direccion: value})).toString();
      window.history.pushState({path: newurl},'',newurl);
    }
    //console.log(document.URL, URI(document.URL).query(_.merge(this.props.location.query, {direccion: value})).toString())
  }

  _changeUso(event, index, value) {
    this.setState({
      uso: value
    })
    //_.merge(this.props.location.query, {uso: value})

    if (window.history.pushState) {
      var newurl = URI(document.URL).query(_.merge(this.props.location.query, {uso: value})).toString();
      window.history.pushState({path:newurl},'',newurl);
    }
    //console.log(document.URL, URI(document.URL).query(_.merge(this.props.location.query, {uso: value})).toString())
  }

  componentDidMount() {
    //console.log('BuscarPage Did Mount');
    EspaciosBusquedaStore.addChangeListener(this._onChange);
    /*if (window.__ReactInitState__) {
      console.log('querys', query);
      let initialState = {};


      if (window.__ReactInitState__.usos) {
        initialState.usos = window.__ReactInitState__.usos;
      }
      console.log('initialState', initialState);
      this.setState(initialState)
      
    }*/
    
  }

  componentWillUnmount() {
    EspaciosBusquedaStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
    	<div>
    		<RichMap 
          viewport={this.state.viewport}
          center={this.state.center}
          markers={this.state.espacios}
          _changeMapCenter={this._changeMapCenter}
          _changeMapCenterSearch={this._changeMapCenterSearch}/>
        <BuscarMenu
          espacios={this.state.espacios}
          searchPlaces={this._searchPlaces} 
          isLoading={this.state.isLoading} 
          usos={this.state.usos}
          uso={this.state.uso}
          direccion={this.state.direccion}
          _changeUso={this._changeUso}
          _changeDireccion={this._changeDireccion} />
        {/*<MapMenu searchPlaces={this._searchPlaces} isLoading={this.state.isLoading}/>*/}
    	</div>
    );
  }
}
