"use strict";

import React from 'react'
import {Link} from 'react-router'
import SessionNavElement from './SessionNavElement.jsx'
import {
  AppBar, 
  FlatButton, 
  LeftNav, 
  Toolbar, 
  ToolbarGroup,
  IconButton} from 'material-ui';
import NavMenu from 'material-ui/lib/svg-icons/navigation/menu'
import LeftNavMenu from './LeftNavMenu.jsx'

const burgerStyle = {
  marginTop: '10px',
  paddingLeft: 0
}

const wrapperStyle = {
  position: 'fixed',
  width: '100%',
  zIndex: '10'
}

export default class Nav extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.getFoto = this.getFoto.bind(this)
    this.getName = this.getName.bind(this)
    this.getFullName = this.getFullName.bind(this)
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  getName() {
    if (this.props.userType == 'fb') {
      return this.props.session.perfil_individual.facebook.first_name
    }else{
      return this.props.session.perfil_individual.nombre
    }
  }

  getFullName() {
    if (this.props.userType == 'fb') {
      return this.props.session.perfil_individual.facebook.name
    }else{
      return this.props.session.perfil_individual.nombre + ' ' +
        this.props.session.perfil_individual.apellido
    }
  }

  getFoto() {
    if (this.props.userType == 'fb') {
      return this.props.session.perfil_individual.facebook.photo
    }else{
      return this.props.session.perfil_individual.foto
    }
  }

  render() {
    //console.log('handleToggle', this.handleToggle);
    const session = this.props.session
    const logged = session ? true : false
    const userType = this.props.userType
    
    return (
        <div style={wrapperStyle}>
          <Toolbar>
            <ToolbarGroup first={true}>
              <IconButton style={burgerStyle} className="visible-xs visible-sm" onTouchTap={this.handleToggle}>
                <NavMenu className="white"/>
              </IconButton>
              <img src="/images/whiteLogoSmall.png" className="logo" />
            </ToolbarGroup>
            <ToolbarGroup >
              <SessionNavElement 
                class="hidden-xs hidden-sm" 
                _goTo={this.props._goTo}
                getFoto={this.getFoto}
                getName={this.getName}
                session={session} 
                userType={userType} />
            </ToolbarGroup>
          </Toolbar>
          <LeftNav 
            docked={false}
            open={this.state.open}
            handleToggle={this.handleToggle}
            onRequestChange={(open) => this.setState({open})} >
            <LeftNavMenu 
              getFoto={this.getFoto}
              getFullName={this.getFullName}
              logged={logged} />
          </LeftNav>

        </div>
        //{
          /*<AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={<SessionNavElement session={session} handleToggle={this.handleToggle}/>} 
            zDepth={0}/>
          */
        //}
    )
  }
}

