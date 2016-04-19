/**
 * Uso.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: {
  	nombre: String,
    cod: String,
    subusos : [String]
  },
  constructSchema: function (schemaDefinedAbove, sails) {
  	var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, { autoIndex: false });

  	newSchema.static('getAll', function (cb) {
  		return this.find({}).cache().exec(cb);
    })

  	return newSchema;
  }
};

