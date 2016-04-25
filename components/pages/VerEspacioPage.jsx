"use strict";

import React from 'react';
import EspacioVerStore from '../stores/EspacioVerStore'
import EspacioVerActionCreator from '../actions/EspacioVerActionCreator'

import VerEspacioJumbo from '../partials/VerEspacioJumbo.jsx'
import VerEspacioInfo from '../partials/VerEspacioInfo.jsx'

export default class VerEspacio extends React.Component {

	constructor(props) {
		super(props)

    this._onChange = this._onChange.bind(this)

    const { id } = this.props.params

    if (!this.props.route.verEspacio || this.props.route.verEspacio._id != id){
      EspacioVerStore.init(undefined)
      EspacioVerActionCreator.buscarEspacio(id)
    }else{
      EspacioVerStore.init(this.props.route.verEspacio);
    }

    this.state = {
      espacio: EspacioVerStore.getEspacio()
    }
    
	}

	_onChange() {
		const espacio = EspacioVerStore.getEspacio();
    this.setState({
    	espacio: espacio
    });
  }

	componentDidMount() {
    EspacioVerStore.addChangeListener(this._onChange);
	}

  componentWillUnmount() {
    EspacioVerStore.removeChangeListener(this._onChange);
  }

  render() {
  	const espacio = this.state.espacio;

    let linkFoto = undefined;
    let moneda = undefined;
    let precio = undefined;
    let displayPrecio = undefined;

    if (espacio) {
      linkFoto = 
        (espacio.fotos[0] ? "//res.cloudinary.com/dh865bqe1/w_1200,h_700,c_fit/" + espacio.fotos[0].public_id : undefined );

      switch (espacio.precio.moneda) {
        case 'US Dolar':
          moneda = '$';
          break;
        case 'PEN Soles':
          moneda = 'S/.';
          break;
      }

      precio = espacio.precio.precio.por_hora.val;

      displayPrecio = 
        (<p>A partir de <span className="price_value">{moneda} {precio}</span> por hora</p>)
      
    }

    return (
    	<div>
				<VerEspacioJumbo 
          linkFoto={linkFoto}
          displayPrecio={displayPrecio}/>
        <VerEspacioInfo 
          moneda={moneda}
          precio={precio}
          espacio={espacio}/>
    	</div>
    );
  }
}
