import React from 'react'
import {Link} from 'react-router'

export default class BusquedaResultados extends React.Component{

	constructor(props) {
    super(props);

    this.buildContent = this.buildContent.bind(this)
  }

  buildContent() {
    let content = [];

    const messageStyle = {
      textAlign: 'center',
      fontFamily: 'Roboto,"Helvetica Neue",sans-serif'
    }

    if (!this.props.espacios || this.props.espacios.length <= 0) {
      content = (<h4 style={messageStyle}>No se encontraron lugares cercanos.</h4>);
      return content;
    }

    for (let i = 0; i < this.props.espacios.length; i++ ) {

      const espacio = this.props.espacios[i];
      /*console.log('espacio.location', espacio.location)
      console.log('espacio.fotos', espacio.fotos);*/
      const linkTo = 'espacio/' + espacio._id;
      const linkFoto = 
        (espacio.fotos[0] ? "//res.cloudinary.com/dh865bqe1/w_1200,h_700,c_fill/" + espacio.fotos[0].public_id : undefined );
      let moneda;
      switch (espacio.precio.moneda) {
        case 'US Dolar':
          moneda = '$';
          break;
        case 'PEN Soles':
          moneda = 'S/.';
          break;
      }

      const precio = (<p>A partir de <span className="price_value">{moneda} {espacio.precio.precio.por_hora.val}</span> por hora</p>)
      //console.log('espacio.foto', espacio.fotos[0]);
      content.push(
        <div className="place_box" key={espacio._id}>
          <div className="listing-img panel-image">
            <Link to={linkTo} >
              <div className="listing-img-container media-cover">
                <img 
                  src={linkFoto}
                  className="img-responsive-height" alt="" />
              </div>
            </Link>
            <Link to={espacio._id} className="box_price" >
              {precio}
            </Link>
          </div>
        </div>);
    }

    return content;

  }

  render(){

  	//console.log('content', content);

  	return (
  		<div>
  		{this.buildContent()}
  		</div>
  	)
  }

}