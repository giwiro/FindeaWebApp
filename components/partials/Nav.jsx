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
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    //console.log('handleToggle', this.handleToggle);
    const session = this.props.session
    
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
              <SessionNavElement class="hidden-xs hidden-sm" session={session}/>
            </ToolbarGroup>
          </Toolbar>
          <LeftNav 
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})} >
            hola
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

