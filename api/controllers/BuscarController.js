/**
 * BuscarController
 *
 * @description :: Server-side logic for managing buscar
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*var NodeGeoCoder = require('node-geocoder'),
		async = require('async');*/


//const geocoder = NodeGeoCoder('google', 'https');

module.exports = {
	index: function (req, res) {

		let state = {
			session: req.user
		};

		Espacio.findAll(function (err, resp) {
			if (err) {
				return res.send('error');
			}
			//console.log('found All espacios', resp);
			state.espaciosBusqueda = resp;
			return renderTo(res, '/buscar', state);
		})

		/*Espacio.findNear(1, 1, 1, function (err, resp){
			if (err) {
				return res.send('error');
			}
			state.espaciosBusqueda = resp;
			return renderTo(res, '/buscar', state);
		})*/
	},

	buscar: function (req, res) {
		Espacio.findNear(1, 1, 1, function (err, resp){
			if (err) {
				return res.send('error');
			}
			return res.json(resp);
		})
	},



	buscarTest: function (req, res) {
		//console.log('Espacio', Espacio.find);
		Espacio.findNear(1, 1, 1, function (err, resp){
			if (err) {
				return res.send('error');
			}
			return res.send(resp);
		})
	}
};

