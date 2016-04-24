import React from 'react'
import {Link} from 'react-router'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'
import SendIcon from 'material-ui/lib/svg-icons/content/send'
import $ from 'jquery'

import {
  FlatButton, 
  LeftNav, 
  Toolbar, 
  ToolbarGroup,
  ToolbarSeparator, 
  IconButton,
	TextField,
	Paper,CircularProgress} from 'material-ui';

const paperStyle = {
	margin: 8
}

const toolbarStyle = {
	backgroundColor: 'white',
	height: '48px',
	padding: '0 10 0 0'
}

const iconStyle = {

}

const separatorStyle = {
	marginTop: 10,
	height: '28px'
}

export default class MapMenu extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			searchIconClass: 'grey',
			isSearching: false
		}

		this.onChangeDireccion = this.onChangeDireccion.bind(this)
		this.deleteDireccion = this.deleteDireccion.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
	}

	componentDidMount() {
	}

	onChangeDireccion(e) {
		const len = e.target.value.length;
		//let iconClass = 'grey';
		if (len > 0){
			$('.searchSpaceIcon').removeClass('grey').addClass('lightblue')
		}else{
			$('.searchSpaceIcon').addClass('grey').removeClass('lightblue')
		}
			//iconClass = 'lightblue'

	}

	onKeyDown(e) {
		if (e.keyCode == 13) {
			console.log('buscar...');
			this.props.searchPlaces();
		}
	}

	deleteDireccion() {
		//this.refs.direcciontextField;
		$('.searchSpaceIcon').addClass('grey').removeClass('lightblue')
	}

	render() {
		let searchButton = (<SendIcon className="searchSpaceIcon grey" />);

		if (this.props.isLoading) {
			searchButton = (<CircularProgress />);
		}
		return (
			<div className="map_menu_wrapper">
				<Paper style={paperStyle} zDepth={2}>
					<Toolbar style={toolbarStyle} className="toolbarMenu" zDepth={2}>
		        <ToolbarGroup>
		          <IconButton onTouchTap={this.deleteDireccion}>
		            <CloseIcon className="grey" />
		          </IconButton>
		        </ToolbarGroup>
		        <ToolbarGroup >
		          <TextField 
		          	ref='direcciontextField'
		          	onChange={this.onChangeDireccion} 
		          	onKeyDown={this.onKeyDown} 
		          	underlineShow={false} 
		          	hintText="Buscar direccion" />
		        </ToolbarGroup>
		        <ToolbarGroup>
		        	<ToolbarSeparator style={separatorStyle} />
		          <IconButton onTouchTap={this.deleteDireccion}>
		            {searchButton}
		          </IconButton>
		        </ToolbarGroup>
		      </Toolbar>
		    </Paper>
	    </div>
    )
	}
}