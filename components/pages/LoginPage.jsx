"use strict";


import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

	const cardStyle = {

	width:'320px',
	marginTop:'10px',  	
  	marginLeft: 'auto',
    marginRight: 'auto'
    
	}

	const cardTitleStyle = {
  	marginTop: '0px',
  	paddingBottom: '0px'
	}

	const cardTextStyle = {
  	paddingTop: '0px'
  	//paddingLeft: 0
	}
	
	const TextStyle = {
  	paddingTop: '0px'
  	
	}

	
export default class LoginPage extends React.Component {


  render() {
  	 return (
<form action="/login" method="post">
  	 <Card  style={cardStyle}>
      
    <CardTitle style={cardTitleStyle} title="Iniciar Sesión" subtitle="Ingresa tus datos" />
    <CardText style={cardTextStyle}>
      	
    		<TextField style={TextStyle}  type="text" name="email" floatingLabelText="Correo Electronico"/><br />
    		<TextField style={TextStyle}  type="password" name="password" floatingLabelText="Password"/><br/>

    		
    	
    </CardText>
    <CardActions >
    <FlatButton hoverColor="#A5B8BB" backgroundColor="#BCC9CC" label="Ingresar" type="submit" />
    
 
    </CardActions>
  </Card>
  </form>
);

  }
}
