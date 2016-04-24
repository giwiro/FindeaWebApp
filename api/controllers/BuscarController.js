/**
 * BuscarController
 *
 * @description :: Server-side logic for managing buscars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {

		let state = {
			session: req.user,
			userType: req.session.userType
		};

		renderTo(res, '/buscar', state);
	}
};

