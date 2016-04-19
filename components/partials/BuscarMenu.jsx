"use strict";

import _ from 'lodash'
import React from 'react'
import {Link} from 'react-router'
import {
  SelectField,
	MenuItem,
  TextField} from 'material-ui';

const selectStyle = {
	width: '100%',
	color: 'rgba(0,0,0,.87)'
}

export default class BuscarMenu extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
    	//categoria: "Lugar de Trabajo"
    }
  }

  render() {

    const usoProp = this.props.uso;
    return (
      <div className="buscarMenu">
	      <div className="buscarOptions">

	      	<div className="optionSection">
		      	<SelectField 
		      		style={selectStyle}
		      		floatingLabelText="¿ Para qué voy a usar el espacio ?"
		      		value={this.props.uso} 
		      		onChange={this.props._changeUso}>
              {_.map(this.props.usos, function (uso, i){
                //const checked = (usoProp == uso.nombre ? true : false);
                return <MenuItem key={uso._id} value={uso.nombre} primaryText={uso.nombre} />
              })}
		        </SelectField>
		      </div>
          <div className="optionSection">
            <TextField
              ref="direccion"
              style={selectStyle}
              defaultValue={this.props.direccion}
              floatingLabelText="¿ Dónde deseas realizar el evento ?" />
            </div>

	      </div>
        <div className="buscarResults">
         resultados
        </div>
      </div>
    )
  }
}

