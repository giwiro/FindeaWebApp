"use strict";

import _ from 'lodash'
import React from 'react'
import {Link} from 'react-router'
import BusquedaResultados from './BusquedaResultados.jsx'
import {
  SelectField,
	MenuItem,
  TextField,
  CircularProgress} from 'material-ui';

const selectStyle = {
	width: '100%',
	color: 'rgba(0,0,0,.87)'
}

const loaderStyle = {
  marginTop: '60px'
}

let timeoutSearch;

export default class BuscarMenu extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
    	//categoria: "Lugar de Trabajo"
    }

    this._onEnter = this._onEnter.bind(this)
    this._onChangeSelect = this._onChangeSelect.bind(this)
    //this._onChangeText = this._onChangeText.bind(this)
  }

  /*_onChangeText() {
    clearTimeout(timeoutSearch);
    const that = this;
    timeoutSearch = setTimeout(function () {
      const direccion = that.refs.direccion.getValue();
      that.props.searchPlaces(direccion)
    }, 1500); 
  }*/

  _onChangeSelect(event, index, value) {
    
    const direccion = this.refs.direccion.getValue()

    if (direccion) 
      this.props.searchPlaces(direccion)

    this.props._changeUso(event, index, value)
  }

  _onEnter(e) {
    clearTimeout(timeoutSearch);
    const that = this;
    timeoutSearch = setTimeout(function () {
      const direccion = that.refs.direccion.getValue();
      if (direccion)
        that.props.searchPlaces(direccion);
    }, 1250); 

    if (e.keyCode == 13) {
      clearTimeout(timeoutSearch);
      const direccion = that.refs.direccion.getValue();
      console.log('buscar...', direccion);
      if (direccion)
        this.props.searchPlaces(direccion);
    }
  }

  render() {
    const usoProp = this.props.uso;
    let resultsContent;

    if (this.props.isLoading) {
      resultsContent = (<CircularProgress style={loaderStyle} size={1.5} />)
    }else{
      resultsContent = (<BusquedaResultados espacios={this.props.espacios}/>)
    }

    return (
      <div className="buscarMenu">
	      <div className="buscarOptions">
	      	<div className="optionSection">
		      	<SelectField
              disabled={this.props.isLoading} 
              ref="uso"
		      		style={selectStyle}
		      		floatingLabelText="¿ Para qué voy a usar el espacio ?"
		      		value={this.props.uso} 
		      		onChange={this._onChangeSelect}>
              {_.map(this.props.usos, function (uso, i){
                //const checked = (usoProp == uso.nombre ? true : false);
                return <MenuItem key={uso._id} value={uso.nombre} primaryText={uso.nombre} />
              })}
		        </SelectField>
		      </div>
          <div className="optionSection">
            <TextField
              ref="direccion"
              disabled={this.props.isLoading}
              style={selectStyle}
              defaultValue={this.props.direccion}
              onKeyDown={this._onEnter}
              floatingLabelText="¿ Dónde deseas realizar el evento ?" />
          </div>
	      </div>
        <div className="buscarResults">
          {resultsContent}
        </div>
      </div>
    )
  }
}

