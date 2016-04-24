/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
import passwordHash from 'password-hash'

module.exports = {

	schema: {
    perfil_individual : {
			nombre : String,
			apellido : String,
			dni: String,
			foto : String,
			password : String,
			telefono: String,
			email : String,

			facebook: {
				id: String,
				token: String,
        emails: [String],
				email: String,
				name: String,
        first_name: String,
        last_name: String,
        photo: String
			},

			linkedin: {
				id: String,
				token: String,
				email: String,
				name: String
			},

			twitter: {
				id: String,
				token: String,
				email: String,
				name: String
			},
			//El tipo es 0 si 
			tipo: Number
		}
  },

  /**
   * constructSchema()
   *
   * Note that this function must be synchronous!
   *
   * @param  {Dictionary} schemaDefinedAbove  [the raw schema defined above, or `{}` if no schema was provided]
   * @param  {SailsApp} sails                 [just in case you have globals disabled, this way you always have access to `sails`]
   * @return {MongooseSchema}
   */
  constructSchema: function (schemaDefinedAbove, sails) {
    // e.g. we might want to pass in a second argument to the schema constructor
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, { autoIndex: false });

    newSchema.pre('save', function (next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('perfil_individual.password')) return next();

        // generate a salt
        /*bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.perfil_individual.password, salt, null, function (err, hash) {
                if (err) return next(err);
                console.log('antes', '`');
                console.log(user.perfil_individual.password, hash);
                // override the cleartext password with the hashed one
                user.perfil_individual.password = hash;
                next();
            });
        });*/
        var hashedPassword = passwordHash.generate(user.perfil_individual.password);
        
        user.perfil_individual.password = hashedPassword;
        next();
    });

    newSchema.method('comparePassword', function (candidatePassword, cb) {
      cb(null, passwordHash.verify(candidatePassword, this.perfil_individual.password));
    })


    // Find by email
    newSchema.static('findByEmail', function (email, cb) {
    	return this.findOne({'perfil_individual.email' : email}, cb);
    })

    //Find by FB id
    newSchema.static('findByFBid', function (fbid, cb) {
      return this.findOne({'perfil_individual.facebook.id' : fbid}, cb);
    })

    //Find if any email matches
    newSchema.static('findByEmails', function (emailArray, cb) {
      return this.find({'perfil_individual.email' : {$in: emailArray}}, cb);
    })

    // Or we might want to define an instance method:
    /*newSchema.method('meow', function () {
      console.log('meeeeeoooooooooooow');
    });*/

    // Or a static ("class") method:
    /*newSchema.static('findByName', function (name, callback) {
      return this.find({ name: name }, callback);
    });*/

    // Regardless, you must return the instantiated Schema instance.
    return newSchema;
  }

};

