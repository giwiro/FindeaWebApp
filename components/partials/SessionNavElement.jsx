"use strict";

import React from 'react'
import {Link} from 'react-router'
import {
  RaisedButton, 
  IconButton, 
  ToolbarSeparator,
  Avatar,
  IconMenu,
  MenuItem,
  Divider} from 'material-ui';
import SessionActionCreator from '../actions/SessionActionCreator'

import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import AccountIcon from 'material-ui/lib/svg-icons/action/account-circle'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import ArrowDropIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import PowerIcon from 'material-ui/lib/svg-icons/action/power-settings-new'
import ListIcon from 'material-ui/lib/svg-icons/action/list'


const warpperStyle = {
  paddingTop: '7px'
}
const avatarStyle = {
  verticalAlign: 'middle',
  margin: '0 12px 0 10px'
}
const dropDownStyle = {
  paddingLeft: '0px'
}
export default class SessionNavElement extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  logout(){
    //For client controlled
    //SessionActionCreator.destroySession();

    //For server controlled
    window.location.href = '/logout';
  }

  render() {

  	const session = this.props.session
    let content;
    let linkButtons = (
      <div className="link_buttons_holder">
        <Link to="/buscar" >
          <IconButton className="vertical_middle">
            <SearchIcon className="white" />
          </IconButton>
        </Link>
        <Link to="/espacio/registro" >
          <RaisedButton className="navButton" label="Quiero registrar mi espacio" primary={true} zDepth={0} />
        </Link>
      </div>
    )

    if (!session) {
      content = (
        <Link to="/login" >
          <RaisedButton className="navButton" label="Iniciar sesión" primary={true} zDepth={0} />
        </Link>)
    }else{
      console.log('session', session)
      content = (
        <div className="inline_element vertical_middle">
          <Avatar style={avatarStyle} src={this.props.getFoto()} />
          
          <IconMenu
            className="vertical_middle"
            iconButtonElement={
              <span>
                <span className="white pointer">{this.props.getName()}</span>
                <IconButton style={dropDownStyle} className="vertical_middle">
                  {/*<MoreVertIcon className="white" />*/}
                  <ArrowDropIcon className="white" />
                </IconButton>
              </span>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}} >

            {/*<MenuItem primaryText="Refresh" />*/}
            
            <MenuItem primaryText="Perfil" containerElement={<Link to="/usuario/perfil" />} leftIcon={<AccountIcon />} />
            <MenuItem primaryText="Mis espacios" containerElement={<Link to="/usuario/espacios" />} leftIcon={<ListIcon />} />
            <Divider />
            <MenuItem primaryText="Cerrar sesión" onTouchTap={this.logout} leftIcon={<PowerIcon />} />
          </IconMenu>
          {/*<RaisedButton className="navButton" label="logout" secondary={false} zDepth={0} onTouchTap={this.logout}/>*/}
        </div>
      )
    }

    return (
      <div className="hidden-xs hidden-sm" style={warpperStyle}>
        {linkButtons}
        <div className="toolbar_separator inline_element" />
        {/*<ToolbarSeparator className="toolbar_separator" />*/}
        {content}
      </div>
    )
    
    
  }
}

