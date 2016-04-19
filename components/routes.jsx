import React from 'react'
import {RouteHandler, Route, IndexRoute} from 'react-router'
import MainPage from './pages/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import BuscarPage from './pages/BuscarPage.jsx'
import App from './App.jsx'
import {merge} from 'lodash'

/*module.exports = (
  <Route path="/" component={App}>
  	<IndexRoute component={MainPage} />
  </Route>
);*/

module.exports = (params) => {

	const session = params.session
	const espaciosBusqueda = params.espaciosBusqueda

	return (
		<Route path="/" component={App} session={session}>
	  	<IndexRoute component={MainPage}/>
	  	<Route path="login" component={LoginPage} />
	  	<Route path="buscar" component={BuscarPage} espaciosBusqueda={espaciosBusqueda} />
	  </Route>
	)
}