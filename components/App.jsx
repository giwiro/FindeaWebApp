"use strict";

import React,{PropTypes} from 'react'
import Nav from './partials/Nav.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';


import lightTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import {
  teal800, teal900,
  indigo500, 
  grey100, grey300, grey500,
  white,
  darkBlack, fullBlack} from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

import {RaisedButton} from 'material-ui';

import SessionStore from './stores/SessionStore'

injectTapEventPlugin();

const lightMuiTheme = getMuiTheme({
	  palette: {
	    primary1Color: 'rgb(32,78,87)',
	    primary2Color: teal900,
	    //primary3Color: grey400,
	    accent1Color: teal800,
	    accent2Color: grey100,
	    accent3Color: grey500,
	    textColor: darkBlack,
	    alternateTextColor: white,
	    canvasColor: white,
	    borderColor: grey300,
	    disabledColor: ColorManipulator.fade(darkBlack, 0.3),
	    //pickerHeaderColor: cyan500,
	    clockCircleColor: ColorManipulator.fade(darkBlack, 0.07),
	    shadowColor: fullBlack
	  },
	  toolbar: {
	  	backgroundColor: 'rgb(32,78,87)',
	  	height: '64px'
	  },
	  textField: {
	  	hintColor: 'rgba(0,0,0,.55)'
	  }
	},
	{
	  avatar: {
	    borderColor: null,
	  },
  	userAgent: 'all',
	});


class App extends React.Component{

	constructor(props) {
		super(props);
		this.constructor.childContextTypes = {
		  muiTheme: PropTypes.object.isRequired
		}

		SessionStore.init(this.props.route.session);
		
		this.state = {
			session: SessionStore.getSession()
		}

		this._onChange = this._onChange.bind(this);
	}

	_goTo(path) {
		this.props.history.pushState(path);
	}

	_onChange() {
		const session = SessionStore.getSession();

    this.setState({
    	session: session
    });
  }

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  }

  getChildContext() {
    return {
      muiTheme: lightMuiTheme
    };
  }

  render() {
  	return (
  		<div>
				<Nav session={this.state.session} _goTo={this._goTo}/>
				{this.props.children}
			</div>
  	);
  }
}


export default App