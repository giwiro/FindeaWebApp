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

import {
  Paper
} from 'material-ui'
import {Link} from 'react-router'

import validateEmail from '../../api/services/validateEmail'

const cardStyle = {
  boxShadow: 'none'
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
	paddingTop: '0px',
  width: '100%'
}

const socialButton = {
  color: 'white',
  marginTop: '10px'
}

const helperSubtitle = {
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.54)',
  display: 'block'
}

	
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    let { query } = this.props.location

      this.state = {
        error: query.error == 'true' ? true : false,
      errorTextEmail: '',
      errorTextPassword: ''
    }

    this.onChangeMail = this.onChangeMail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onBlurEmail = this.onBlurEmail.bind(this)
    this.onBlurPassword = this.onBlurPassword.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  onBlurEmail() {
    const email = this.refs.email.getValue()

    if (email.length < 1) {
      return this.setState({
        errorTextEmail: 'Ingrese su correo'
      })
    }else{
      const valid = validateEmail(email);
      if (!valid) {
        this.setState({
          errorTextEmail: 'Ingrese un email válido'
        })
      }else{
        return this.setState({
          errorTextEmail: ''
        })
      }
    }
  }

  onBlurPassword() {
    const password = this.refs.password.getValue()
    console.log('password', password);
    if (password.length < 1) {
      return this.setState({
        errorTextPassword: 'Ingrese su contraseña'
      })
    }else{
      return this.setState({
        errorTextPassword: ''
      })
    }
  }

  onChangePassword() {
    const password = this.refs.password.getValue()
    console.log('password', password);
    if (password.length < 1) {
      return this.setState({
        errorTextPassword: 'Ingrese su contraseña'
      })
    }else{
      return this.setState({
        errorTextPassword: ''
      })
    }
  }


  onChangeMail() {
    const email = this.refs.email.getValue()
    console.log('email', email);
    if (email.length < 1) {
      return this.setState({
        errorTextEmail: 'Ingrese su correo'
      })
    }else{
      return this.setState({
        errorTextEmail: ''
      })
    }
  }

  //onSubmit

  onSubmitForm(e){
    const email = this.refs.email.getValue()
    const password = this.refs.password.getValue()
    const valid = validateEmail(email)

    if (email.length < 1 || !valid || password.length < 1) {
      e.preventDefault();
      return false
    }
  }


  render() {
  	return (

      <Paper className="login_paper_wrap" zDepth={3}>
        
          <Card style={cardStyle} className="login_card">
            <form action="/login" method="post" onSubmit={this.onSubmitForm}>
              <CardTitle style={cardTitleStyle} title="Iniciar Sesión" subtitle="Ingresa tus datos" />
              <CardText style={cardTextStyle}>

                <TextField 
                  style={TextStyle}  
                  type="text" 
                  name="email"
                  ref="email"
                  errorText= {this.state.errorTextEmail}
                  onBlur={this.onBlurEmail}
                  floatingLabelText="Correo Electronico"/><br />
                <TextField 
                  style={TextStyle}  
                  type="password" 
                  name="password" 
                  ref="password"
                  errorText= {this.state.errorTextPassword}
                  onBlur={this.onBlurPassword}
                  floatingLabelText="Password"/><br/>

              </CardText>
              <CardActions className="login_card_action">
                <FlatButton className="login_submit_button" hoverColor="#A5B8BB" backgroundColor="#BCC9CC" label="Ingresar" type="submit" />
              </CardActions>
            </form>
          </Card>

          <Card style={cardStyle} className="help_card">
          
            <span className="hidden-xs" style={helperSubtitle}>Puedes iniciar con redes sociales</span>
            <FlatButton 
              style={socialButton}
              className="socialButton"
              linkButton={true}
              href="/facebook"
              icon={<img className="image_icon" width="30" height="30" src="/images/facebook-icon.png" />}
              hoverColor="#224389" 
              backgroundColor="#3b5998" 
              label="Ingresar con Facebook" 
              type="button" />

            <p style={helperSubtitle}>Si aún no tiene una cuenta puedes registrarte <Link to="/registro">aquí</Link></p>
          </Card>
        
      </Paper>
      
    );

  }
}
