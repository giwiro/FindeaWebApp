"use strict";

import React from 'react'
import {Link} from 'react-router'
import {RaisedButton, IconButton} from 'material-ui';


export default class VerEspacioJumbo extends React.Component{

  constructor(props) {
    super(props);

  }

  render() {

  	let {linkFoto, precio, moneda} = this.props

  	let coverImgStyle = undefined;
  	let displayPrecio = undefined;

  	if (linkFoto) {
  		coverImgStyle = {
        backgroundImage: 'url(' + linkFoto + ')'
      }
  	}

  	if (this.props.displayPrecio) {
  		displayPrecio = (this.props.displayPrecio);
  	}else{
  		displayPrecio = (<span className="price_value"> -- </span>);
  	}

    return (
      <div id="photo">
				<span className="cover-img-container">
					<div className="cover-img" style={coverImgStyle}></div>

						<div className="verEspacio_responsive_wrap">
							<a href="javascript:void(0);" className="box_price box_price_responsive">
								{displayPrecio}
							</a>
						</div>

				</span>
			</div>
    )
        
  }
}

