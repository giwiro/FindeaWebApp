"use strict";

import React from 'react'
import {Link} from 'react-router'
import {RaisedButton, IconButton, ToolbarSeparator} from 'material-ui';
import SessionActionCreator from '../actions/SessionActionCreator'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'

const warpperStyle = {
  paddingTop: '7px'
}
const searchIconStyle = {
  verticalAlign: 'middle'
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

    if (!session) {
      content = (
        <Link to="/login" >
          <RaisedButton className="navButton" label="Iniciar sesión" primary={true} zDepth={0} />
        </Link>)
    }else{
      content = (
        <div>
          {session.name}
          <RaisedButton className="navButton" label="logout" secondary={false} zDepth={0} onTouchTap={this.logout}/>
        </div>
      )
    }

    return (
      <div className="hidden-xs hidden-sm" style={warpperStyle}>
        <Link to="/buscar" >
          <IconButton style={searchIconStyle}>
            <SearchIcon className="white" />
          </IconButton>
        </Link>
        {/*<ToolbarSeparator />*/}
        {content}
      </div>
    )
    
    
  }
}

