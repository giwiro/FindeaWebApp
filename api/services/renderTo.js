import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext, Router } from 'react-router'

import routes from '../../components/routes.jsx'


module.exports = function(res, url, state) {

	match({ routes: routes(state), location: url}, function (error, redirectLocation, renderProps) {

		const str = renderToString(
			<RouterContext {...renderProps} />
		);

		Uso.getAll(function (err, usos) {
			if (!err) {
				state.usos = usos;
			}

			const initState = 'window.__ReactInitState__=' + JSON.stringify(state) + ';';
			
			res.view('layout', {
				initState,
		    body: str
	    });
		});


		

		
	});

  /*Router.run(routes, url, (Root) => {
    if (state)
      locals.state = 'window.__ReactInitState__=' + JSON.stringify(state) + ';';
    method("layout", {
      locals: locals||{title:'',description:''},
      body: React.renderToString(<Root {...state} />)
    });
  });*/
}