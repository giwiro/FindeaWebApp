/**
 * EspacioController
 *
 * @description :: Server-side logic for managing espacios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	verEspacio: function (req, res) {
		let state = {
			session: req.user,
			userType: req.session.userType
		};

		const idEspacio = req.param('id');

		if (!idEspacio) return res.redirect('/buscar')

		Espacio.findById(idEspacio, function (err, espacio) {
			if (err) return res.redirect('/buscar')

			state.verEspacio = espacio;
			return renderTo(res, '/espacio/' + idEspacio, state);
		})
	},

	buscarEspacio: function (req, res) {
		const idEspacio = req.param('id');
		Espacio.findById(idEspacio, function (err, espacio) {
			if (err) return res.redirect('/buscar')
			return res.json(espacio);
		})
	}
};

