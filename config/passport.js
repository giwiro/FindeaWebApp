var /*async = require('async'),*/
    _ = require('lodash'),
    passport = require('passport'),
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
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {

  	Usuario.findByEmail(email, function (err, user){
			if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect.' });
      }

      user.comparePassword(password, function (err, isMatch){
  			if (isMatch) {
          req.session.userType = 'local';
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
    profileFields: ['id', 'displayName', 'name', 'email', 'gender', 'photos'],
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, cb) {

    Usuario.findByFBid(profile.id, function (err, user) {
      if (err) return cb(err, null);

      var emails = _.map(profile.emails, function (email, index){
        return email.value
      })

      var photos = _.map(profile.photos, function (photo, index){
        return photo.value
      })

      var facebook = {
        id: profile.id,
        token: accessToken,
        emails: emails,
        email: emails[0],
        name: profile.name.givenName + ' ' + profile.name.familyName,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        photo: photos[0]
      }

      if (user) {
        user.perfil_individual.facebook = facebook;
        console.log('user found and saving ...', user);
        return user.save(function (err, user) {
          if (err) return cb(err, null);

          req.session.userType = 'fb';
          return cb(null, user)

        });
      }else{
        var newUser = new Usuario({
          'perfil_individual.facebook': facebook
        })

        console.log('new fb user and saving ...', newUser);

        return newUser.save(function (err, newUser) {
          if (err) return cb(err, null);

          req.session.userType = 'fb';
          return cb(null, newUser)

        });
      }
      
    })
    
  }
))