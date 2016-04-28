var sails = require('sails'),
    cloudinary = require('cloudinary');

before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(15000);
  console.info('Sails Test initialization');
  sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.

    cloudinary.config(sails.config.cloudinary);
    done(err, sails);
  });
});

after(function (done) {
  // here you can clear fixtures, etc.
  console.info('Sails shutting down');
  console.info('bye bye giwiro');
  sails.lower(done);
});