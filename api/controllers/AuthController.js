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


	localStrategy : function (req, res, next) {
		passport.authenticate('local', {session: true}, function (err, user, info) {
			
			console.log('local auth', user);

			if ((err) || (!user)) {
				return res.redirect('/login?error=local');
				/*return res.send({
					message: info.message,
					user: user
				});*/
			}

			req.logIn(user, function (err) {
				if (err) res.send(err);
				/*return res.send({
					message: info.message,
					user: user
				});*/
				return res.redirect('/')
			});

		})(req, res, next);
	},

	facebookStrategy: function (req, res, next) {
		passport.authenticate('facebook', {
			scope: [
        'public_profile',
        'email'
      ]
		}/*, function (err, user) {
			console.log('fb auth', user);

			if ((err) || (!user)) {
				return res.redirect('/login?error=fb');
			}

			req.logIn(user, function (err) {
				if (err) res.send(err);

				return res.redirect('/')
			});

		}*/)(req, res, next)
	},

	facebookCallback: function (req, res, next) {
		passport.authenticate('facebook', function (err, user) {
			//console.log('req.user', req.user);
			if ((err) || (!user)) {
				return res.redirect('/login?error=fb');
			}

			req.logIn(user, function (err) {
				if (err) res.send(err);

				return res.redirect('/')
			});

		})(req, res, next)
	}
};

