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

		console.log('idEspacio', idEspacio);
	}
};

