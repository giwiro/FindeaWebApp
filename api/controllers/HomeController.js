/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//import routes from '../../components/routes.jsx';

module.exports = {
	index : function (req, res) {

		let state = {
			session: req.user
		};

		//renderTo(res, '/', state);

		res.view('landing');
		
	},

	/*'home' : function (req, res) {

		let state = {
			session: {
				name: 'Gi Wah'
			}
		};

		renderTo(res, '/home', state);
	}*/

};

