/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//import routes from '../../components/routes.jsx';

module.exports = {
	index : function (req, res) {

		Uso.getAll(function (err, usos) {
			let state = {
				session: req.user,
				userType: req.session.userType,
				usos: []
			}
			if (!err) {
				state.usos = usos
			}
			return res.view('landing', state)
			
		})

		

		

		//renderTo(res, '/', state);

		//return res.view('landing', state);
		
	}

};

