/**
 * BuscarController
 *
 * @description :: Server-side logic for managing buscar
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var geocoder = require('node-geocoder')('google', 'https');

module.exports = {
	index: function (req, res) {

		let state = {
			session: req.user
		};
		let searchParams = {};
		
		var uso = req.param('uso'),
				direccion = req.param('direccion');

		if (uso) {
			//por mientas
			//searchParams.uso = uso
		}

		if (direccion) {
			Espacio.findByDireccion(searchParams, direccion, function (err, resp) {
				if (err) {
					return res.send(err);
				}
				state.espaciosBusqueda = resp.espacios;
				state.center = resp.center;
				state.viewport = resp.viewport;
				return renderTo(res, '/buscar', state);
			})
		}else{
			Espacio.find(searchParams).exec(function (err, resp) {
				if (err) {
					return res.send(err);
				}
				state.espaciosBusqueda = resp;
				return renderTo(res, '/buscar', state);
				/*return res.json({
					espacios: resp,
					center: address.geometry.location,
					viewport: address.geometry.viewport
				});*/
			})
		}
		

		/*Espacio.findNear(1, 1, 1, function (err, resp){
			if (err) {
				return res.send('error');
			}
			state.espaciosBusqueda = resp;
			return renderTo(res, '/buscar', state);
		})*/
	},

	buscar: function (req, res) {
		var direccion = req.param('direccion'),
				center = req.param('center'),
				radius = req.param('radius'),
				uso = req.param('uso');

		let searchParams = {};


		if (uso) {
			//searchParams.uso = uso
		}

		if (direccion) {
			Espacio.findByDireccion(searchParams, direccion, function (err, resp) {
				if (err) {
					return res.send(err);
				}
				return res.json(resp);
			})
		}else if(center && radius){
			Espacio.findNear(
				searchParams,
				center.lat, 
				center.lng, 
				radius, function (err, resp){
				if (err) {
					return res.send(err);
				}
				return res.json({
					espacios: resp
				});
			})
		}else{
			return res.json({
				error: 'papeh'
			});
		}

	}

};

