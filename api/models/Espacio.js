/**
 * Espacio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
import mongoose from 'mongoose'

module.exports = {

	schema: {
		_id_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    /* Estados:
      0: inicial, faltan campos
      1: completo        
    */
  	estado: Number,

  	uso: String,

  	subusos: [String],

    informacion: {
    	titulo : String,
    	descripcion: String
    },

    location : {
      'type' : {
        type: String,
        required: true,
        default: 'Point'
      },
      'coordinates': {
        type: [Number]
      }
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

    newSchema.index({location: '2dsphere'});

    newSchema.static('findAll', function (cb) {
      const query = this.find({});
      return query.exec(cb);

    });

    newSchema.static('findNear', function (lat, lon, radius, cb) {

    	const opts = {lat, lon, radius};

    	const query = this.find( { 'location' :
				{ 
					$near : { 
						$geometry : { 
							type : "Point" ,
							coordinates : [-12.060028954225839, -77.04136730290526]
						} ,
						$maxDistance : 4000
					}
				} 
			});

			return query.exec(cb);

    	//return this.findOne({'perfil_individual.email' : email}, cb);
    })

    return newSchema;
  }
  

};

