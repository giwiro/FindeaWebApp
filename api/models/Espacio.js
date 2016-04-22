/**
 * Espacio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
import mongoose from 'mongoose'
import calculateDistanceBetween from '../services/calculateDistanceBetween'
import _ from 'lodash'
var geocoder = require('node-geocoder')('google', 'https');

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

    location : {
      'type' : {
        type: String,
        required: true,
        default: 'Point'
      },
      'coordinates': {
        type: [Number]
      }
    },

    informacion: {
      titulo : String,
      descripcion: String
    },
    precio: {
      moneda: String,
      precio: {
        por_hora: {
          val: Number,
          check: Boolean
        },
        por_dia: {
          val: Number,
          check: Boolean
        },
        por_semana: {
          val: Number,
          check: Boolean
        },
        por_mes: {
          val: Number,
          check: Boolean
        }
      },
      num_personas: Number,
      informacion: String
    },

    fotos: [
      {
        url: String,
        public_id: String,
        descripcion: String,
        src: String
      }
    ],

    ubicacion: {
      direccion: String,
      codigo_postal: String,
      ciudad: String,
      pais: String,
      referencia: String
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

    newSchema.static('findByDireccion', function (params, direccion, cb) {
      //console.log('findByDireccion', params, direccion);
      const that = this;
      geocoder.geocode({address: direccion, country: 'Peru'})
        .then(function (address, status) {
          //res.send(address.raw);
          var address = address.raw.results[0];
          /*console.log('address', address);
          console.log('viewport', address.geometry.viewport.northeast)*/

          var radius = calculateDistanceBetween(
            address.geometry.location.lat, 
            address.geometry.location.lng,
            address.geometry.viewport.northeast.lat,
            address.geometry.viewport.northeast.lng,
            'K');

          radius = Math.floor(radius * 100) / 100;
          //console.log('radius', radius);

          var findParams = _.merge({ 'location' :
            { 
              $near : { 
                $geometry : { 
                  type : "Point" ,
                  //coordinates : [lat, lng]
                  coordinates : [address.geometry.location.lng, address.geometry.location.lat]
                } ,
                $maxDistance : radius * 1000
              }
            } 
          }, params);

          //console.log('findParams', findParams);

          const query = that.find(findParams);

          return query.exec(function (err, espacios) {
            if (err)
              cb(err, null)

            cb(null, {
              espacios: espacios,
              center: address.geometry.location,
              viewport: address.geometry.viewport
            })
          });

        })
        .catch(function (err) {
          return cb(err, null);
        });
    })

    newSchema.static('findNear', function (params, lat, lng, radius, cb) {
      //console.log('findNear radius', radius * 1000);
    	const query = this.find( _.merge({ 'location' :
				{ 
					$near : { 
						$geometry : { 
							type : "Point" ,
							//coordinates : [lat, lng]
              coordinates : [lng, lat]
						} ,
						$maxDistance : radius * 1000
					}
				} 
			}, params));

			return query.exec(cb);

    	//return this.findOne({'perfil_individual.email' : email}, cb);
    })

    return newSchema;
  }
  

};

