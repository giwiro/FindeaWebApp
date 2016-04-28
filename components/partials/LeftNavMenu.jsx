"use strict";

import React from 'react'
import {Link} from 'react-router'
import {
  MenuItem,
	Divider,
	Avatar} from 'material-ui';
const primaryColor = 'rgb(32,78,87)';

import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import AccountIcon from 'material-ui/lib/svg-icons/action/account-circle'
import CloudUploadIcon from 'material-ui/lib/svg-icons/file/cloud-upload'
import ArrowDropIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import PowerIcon from 'material-ui/lib/svg-icons/action/power-settings-new'
import ListIcon from 'material-ui/lib/svg-icons/action/list'

const bottomWrapStyle = {
	position: 'absolute',
	bottom: 0,
	width: '100%'
}

const profileJumboSyle = {
	height: 'auto',
	padding: '30px 0 10px 10px',
	backgroundColor: primaryColor
}

const profileJumboNameSyle = {
	margin: '10px 0 0 0',
	fontSize: '0.9em'
}

export default class LeftNavMenu extends React.Component{  

  constructor(props) {
    super(props);
  }

  logout(){
    //For client controlled
    //SessionActionCreator.destroySession();

    //For server controlled
    window.location.href = '/logout';
  }

  render() {

  	let profileJumbo = undefined

  	let content = (
  		<div>
  			<Divider />
  			<MenuItem 
  				primaryText="Iniciar sesión" 
  				onTouchTap={this.props.handleToggle} 
  				containerElement={<Link to="/login" />} 
  				leftIcon={<AccountIcon />} />
  		</div>
  	)

  	if (this.props.logged) {
  		profileJumbo = (
  			<div style={profileJumboSyle}>
  				<Avatar src={this.props.getFoto()} />
  				<p className="white" style={profileJumboNameSyle}>{this.props.getFullName()}</p>
  			</div>
  		)
  		content = (
  			<div>
  				<Divider />
	    		<MenuItem 
	    			primaryText="Perfil" 
    				onTouchTap={this.props.handleToggle} 
    				containerElement={<Link to="/usuario/perfil" />} 
    				leftIcon={<AccountIcon />} />
	        <MenuItem 
	        	primaryText="Mis espacios" 
        		onTouchTap={this.props.handleToggle} 
        		containerElement={<Link to="/usuario/espacios" />} 
        		leftIcon={<ListIcon />} />

	        {/*<div style={bottomWrapStyle}>*/}
	        	{/*<Divider />*/}
	        	<MenuItem 
	        		primaryText="Cerrar sesión" 
        			onTouchTap={this.logout} 
        			leftIcon={<PowerIcon />} />
	        {/*</div>*/}
  			</div>
  		)
  	}

    return (
    	<div>
    		{profileJumbo}
    		<MenuItem containerElement={<Link to="/espacio/registro" />} leftIcon={<CloudUploadIcon />}>Quiero subir mi espacio</MenuItem>
    		<MenuItem containerElement={<Link to="/buscar" />} leftIcon={<SearchIcon />}>Buscar</MenuItem>
    		{content}
    	</div>
    )
  }
}

