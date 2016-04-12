/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

	index : function (req, res) {
		//renderTo
		let state = {
			session: req.user
		};

		renderTo(res, '/login', state);
	},

	logout: function(req, res) {
	  req.logout();
  	res.redirect('/?has_logged_out=1');
  },


	localStrategy : function (req, res) {
		passport.authenticate('local', {session: true}, function (err, user, info) {
			
			console.log('user', user);

			if ((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}

			req.logIn(user, function (err) {
				if (err) res.send(err);
				/*return res.send({
					message: info.message,
					user: user
				});*/
				return res.redirect('/')
			});

		})(req, res);
	}
};

