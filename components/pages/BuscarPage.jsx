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
		this.state = {
			espacios: EspaciosBusquedaStore.getEspacios(),
      isLoading: false
		}
		this._onChange = this._onChange.bind(this);
    this._changeUso = this._changeUso.bind(this);
    this._changeDireccion = this._changeDireccion.bind(this)

	}

	_onChange() {
		const espacios = EspaciosBusquedaStore.getEspacios();
    const isLoading = EspaciosBusquedaStore.isLoading();

    console.log('changed->espacios', espacios);
    console.log('changed->isLoading', isLoading);

    this.setState({
    	espacios: espacios,
      isLoading: isLoading
    });
  }

  _searchPlaces() {
    EspaciosBusquedaActionCreator.searchPlaces()
  }

  _changeDireccion(value) {
    if (window.history.pushState) {
      var newurl = URI(document.URL).query({direccion: value}).toString();
      window.history.pushState({path: newurl},'',newurl);
    }
    console.log(document.URL, URI(document.URL).query({uso: value}).toString())
  }

  _changeUso(event, index, value) {
    this.setState({
      uso: value
    })
    //_.merge(this.props.location.query, {uso: value})

    if (window.history.pushState) {
      var newurl = URI(document.URL).query({uso: value}).toString();
      window.history.pushState({path:newurl},'',newurl);
    }
    console.log(document.URL, URI(document.URL).query({uso: value}).toString())
  }

  componentDidMount() {
    EspaciosBusquedaStore.addChangeListener(this._onChange);
    let { query } = this.props.location;
    if (window.__ReactInitState__) {
      console.log('querys', query);
      let initialState = {
        usos: []
      };

      if (query.direccion) {
        initialState.direccion = query.direccion
      }

      if (query.uso) {
        const isValidUso = _.some(window.__ReactInitState__.usos, {
          nombre: query.uso
        })
        if (isValidUso) {
          initialState.uso = query.uso
        }
      }

      if (window.__ReactInitState__.usos) {
        initialState.usos = window.__ReactInitState__.usos;
      }

      this.setState(initialState)
      
    }
    
  }

  componentWillUnmount() {
    EspaciosBusquedaStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
    	<div>
    		<RichMap markers={this.state.espacios}/>
        <BuscarMenu 
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
