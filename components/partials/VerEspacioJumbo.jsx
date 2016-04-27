"use strict";

import React from 'react'
import {Link} from 'react-router'
import {RaisedButton, IconButton} from 'material-ui'
import ExecutionEnvironment from 'exenv'
import $ from 'jquery'
import _ from 'lodash'


export default class VerEspacioJumbo extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /*const $coverImg = $('.cover-img');
    $(window).scroll((e) => {
      const scroll = $(window).scrollTop();
      if (scroll > $coverImg.height()) return true;
      const percent = Math.round((45 - 20*(scroll/201))*100)/100;
      $coverImg.css('background-position-y', percent + '%');
    })*/
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

