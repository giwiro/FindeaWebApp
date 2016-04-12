var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  Usuario.findById(id , function (err, user) {
  	done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {

  	Usuario.findByEmail(email, function (err, user){
			if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect.' });
      }

      user.comparePassword(password, function (err, isMatch){
  			if (isMatch) {
  				return done(null, user, {
            message: 'Logged In Successfully'
          });
  			}
  			return done(null, false, {
        	message: 'Invalid Password'
        });
  		});
  	});
  }
));