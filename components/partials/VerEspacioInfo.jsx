"use strict";

import React from 'react'
import {
  Paper,
	Card,
	CardTitle,
	CardText} from 'material-ui';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

import {default as ScriptjsLoader} from "react-google-maps/lib/async/ScriptjsLoader";


const wrapStyle = {
	marginTop: '40px'
}

const cardStyle = {
	margin: '20px 10px 10px 10px'
}

const titleStyle = {
	margin: '5px 0 0 0',
	fontSize: '1.3em'
}

const textStyle = {
	fontSize: '1.1em'
}

export default class VerEspacioInfo extends React.Component{

  constructor(props) {
    super(props);

    this.initMap = this.initMap.bind(this)
  }

  initMap(map) {
  	this.map = map;
  }

  render() {

  	const espacio = this.props.espacio
  	let center = undefined;
  	let direccion = undefined;
  	let descripcion = undefined;
  	let monedaLabel = undefined;

  	if (espacio) {
  		center = {
	    	lat: espacio.location.coordinates[1],
	      lng: espacio.location.coordinates[0]
	    }

	    direccion = espacio.ubicacion.direccion
	    descripcion = espacio.informacion.descripcion;
	    monedaLabel = espacio.precio.moneda;
  	}
  	
    const marker = <Marker position={center}/>
    
    return (
      <div style={wrapStyle} className="verEspacio_responsive_wrap">
      	<Card style={cardStyle}>
      		<CardText>
      			<h3 style={titleStyle}>Información sobre este anuncio</h3>
      			<p style={textStyle}>{descripcion}</p>
      		</CardText>
      	</Card>

      	<Card style={cardStyle}>
      		<CardText>
      			<h3 style={titleStyle}>Precio</h3>
      			<p style={textStyle}>
      				Precio por hora: 
      				<strong style={{margin: '0 5px'}}>{this.props.moneda} {this.props.precio}</strong> 
      				({monedaLabel})
      			</p>
      		</CardText>
      	</Card>

      	<Card style={cardStyle}>
      		<CardText>
      			<h3 style={titleStyle}>Ubicación</h3>
      			<p style={textStyle}>{direccion}</p>
      		</CardText>
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
			              height: "300px",
			            }} />
			        }
			        googleMapElement={
			          <GoogleMap
			            ref={this.initMap}
			            defaultZoom={16}
			            mapTypeId={"roadmap"}
			            center={center}>

			            {marker}
			          </GoogleMap>
			        } />
      	</Card>
      </div>
    )
  }
}

