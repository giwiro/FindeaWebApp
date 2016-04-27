"use strict";

import React from 'react'
import _ from 'lodash'
import {
  Paper,
	Card,
	CardTitle,
	CardText} from 'material-ui';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import Gallery from 'react-photo-gallery'
import {default as ScriptjsLoader} from "react-google-maps/lib/async/ScriptjsLoader";
import TagsInputAutocomplete from '../partials/TagsInputAutocomplete.jsx'

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

const textStyleInline = {
  fontSize: '1.1em',
  display: 'inline-block',
  marginRight: '10px'
}

const helperP = {
  color: 'transparent',
  lineHeight: '2px',
  marginTop: '0px'
}

export default class VerEspacioInfo extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      subusos: undefined
    }

    this.initMap = this.initMap.bind(this)
  }

  initMap(map) {
  	this.map = map;
  }

  componentDidMount() {

  }

  render() {

  	let espacio = this.props.espacio
  	let center = undefined;
  	let direccion = undefined;
  	let descripcion = undefined;
  	let monedaLabel = undefined;
    let uso = undefined;
    let subusos = undefined;

    let PHOTO_SET = [];

  	if (espacio) {
  		center = {
	    	lat: espacio.location.coordinates[1],
	      lng: espacio.location.coordinates[0]
	    }

	    direccion = espacio.ubicacion.direccion
	    descripcion = espacio.informacion.descripcion;
	    monedaLabel = espacio.precio.moneda;
      uso = espacio.uso;
      subusos = espacio.subusos;

      espacio.fotos.forEach(function (foto) {
        let f = _.clone(foto);
        f.src = '//res.cloudinary.com/dh865bqe1/w_500/' + f.public_id;
        f.aspectRatio = (f.width / f.height);
        f.lightboxImage = {
            src: '//res.cloudinary.com/dh865bqe1/w_1200/' + f.public_id/*,
            srcset: [
              '//res.cloudinary.com/dh865bqe1/w_1024/' + f.public_id + ' 1024w',
              '//res.cloudinary.com/dh865bqe1/w_800/' + f.public_id + ' 800w',
              '//res.cloudinary.com/dh865bqe1/w_500/' + f.public_id + ' 500w',
              '//res.cloudinary.com/dh865bqe1/w_320/' + f.public_id + ' 320w'
            ]*/
          }
        PHOTO_SET.push(f);
      });
  	}else{
      espacio = {
        subusos: []
      };
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
            <h3 style={titleStyle}>Usos</h3>
            <p style={textStyle}>Este espacio se puede usar para: <strong>{uso}</strong></p>
            <p style={textStyleInline} className="pull-left">Específicamente para: </p>
            <TagsInputAutocomplete 
              readOnly={true} 
              tags={espacio.subusos}/>
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
            <h3 style={titleStyle}>Fotos</h3>
          </CardText>
          <div className="gallery_wrap">
            <Gallery photos={PHOTO_SET} lightboxShowImageCount={true} backdropClosesModal={true}/>
            <p style={helperP}>p</p>
          </div>

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

