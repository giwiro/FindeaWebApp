import React from 'react'
import {RouteHandler, Route, IndexRoute} from 'react-router'
import MainPage from './pages/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import BuscarPage from './pages/BuscarPage.jsx'
import VerEspacioPage from './pages/VerEspacioPage.jsx'
import App from './App.jsx'
import {merge} from 'lodash'

/*module.exports = (
  <Route path="/" component={App}>
  	<IndexRoute component={MainPage} />
  </Route>
);*/

module.exports = (params) => {

	const session = params.session
	const userType = params.userType
	const espaciosBusqueda = params.espaciosBusqueda
	const usos = params.usos
	const verEspacio = params.verEspacio

	return (
		<Route path="/" component={App} session={session} userType={userType}>
	  	<IndexRoute component={MainPage}/>
	  	<Route path="login" component={LoginPage} />
	  	<Route path="buscar" component={BuscarPage} espaciosBusqueda={espaciosBusqueda} usos={usos} />
	  	<Route path="/espacio/:id" component={VerEspacioPage} verEspacio={verEspacio}/>
	  </Route>
	)
}