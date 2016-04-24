var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
FacebookStrategy = require('passport-facebook').Strategy;


var FACEBOOK_APP_ID = "430365700492582",
    FACEBOOK_APP_SECRET = "86832c1508bbb22045e996c8bf7f5047",
    FACEBOOK_CALLBACK_URL = "http://www.giwiro.com:1337/login/facebook/callback";
  //FACEBOOK_CALLBACK_URL = "http://localhost/login/facebook/callback";


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

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'name', 'email', 'gender', 'photos']
  },
  function (accessToken, refreshToken, profile, cb) {
    Usuario.findByFBid(profile.id, function (err, user) {
      if (err) {
        console.error(err);
        return cb(err)
      }

      //Lo encontro
      if (user) {
        return cb(null, user)
      }

      //crea un nuevo usuario
      console.log('se crea un nuevo usuario');
    })
  }
))