/**
 * EspacioController
 *
 * @description :: Server-side logic for managing espacios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async'),
		cloudinary = require('cloudinary');

module.exports = {
	verEspacio: function (req, res) {
		let state = {
			session: req.user,
			userType: req.session.userType
		};

		let tasks = [];

		const idEspacio = req.param('id');

		if (!idEspacio) return res.redirect('/buscar')

		tasks.push(function (callback) {
			Espacio.findById(idEspacio, function (err, espacio) {
				if (err) {
					return callback(err, null);
				}
				callback(null, espacio);
			})
		})

		tasks.push(function (espacio, callback) {
			cloudinary.api.resources_by_tag(espacio._id_usuario, function (result){
				let sendEspacio = _.clone(espacio.toObject());
				
				if (!(result instanceof Error)){
					sendEspacio.fotos = result.resources
				} 

				state.verEspacio = sendEspacio;
				renderTo(res, '/espacio/' + idEspacio, state);
				return callback(null)
			});
		})

		async.waterfall(tasks, function (err) {
			if (err) return res.redirect('/buscar');
		})

		
	},

	buscarEspacio: function (req, res) {
		const idEspacio = req.param('id');

		if (!idEspacio) return res.json({error: 'No se ha  el id del Espacio'})

		let tasks = []

		tasks.push(function (callback) {
			Espacio.findById(idEspacio, function (err, espacio) {
				if (err) {
					return callback(err, null);
				}
				callback(null, espacio);
			})
		})

		tasks.push(function (espacio, callback) {

			cloudinary.api.resources_by_tag(espacio._id_usuario, function (result){

				let sendEspacio = _.clone(espacio.toObject());
				espacio.fotos = result.resources;

				if (!(result instanceof Error)){
					sendEspacio.fotos = result.resources
				} 

				res.json(sendEspacio);
				return callback(null)
			});
		})

		async.waterfall(tasks, function (err) {
			if (err) return res.json({error: 'Error al encontrar espacio'})
		})
	}
};

