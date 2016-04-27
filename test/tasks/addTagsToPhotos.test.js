var request = require('supertest'),
		lodash = require('lodash'),
		async = require('async'),
		cloudinary = require('cloudinary'),


		ObjectId = require('mongoose').Types.ObjectId; 

describe('addTagToPhoto', function() {

  describe('#addTagPhoto()', function() {
    it('should change per each photo, its user id', function (done) {

    	var fotos_usuarios = {},
    			tasks = [];

    	Usuario
    		.find({})
    		.exec(function (err, usuarios) {
    			if (err) throw err
    			usuarios.forEach(function (usuario) {
    				fotos_usuarios[usuario._id] = {};
    				tasks.push(function (callback) {
    					Espacio
	    					.find({
	    						_id_usuario: new ObjectId(usuario._id)
	    					})
	    					.exec(function (err, espacios) {
	    						if (err){
	    							callback(err, null);
	    							return console.error('error at id:' + usuario._id, err);
	    						}
	    						var arrFotos = [];
	    						espacios.forEach(function (espacio) {
	    							(espacio.fotos).forEach(function (foto) {
	    								if (foto.src == 'cloudinary')
	    									arrFotos.push(foto.public_id);
	    							})
	    						})
	    						fotos_usuarios[usuario._id] = arrFotos;
	    						return callback(null, {
	    							id: usuario._id,
	    							arrFotos: arrFotos
	    						});
	    					})
    				});
    			});

    			//console.log('tesks', tasks);

	    		async.parallel(tasks, function (err, results) {
	    			var cloudinarTasks = []

	    			var idUsuarios = Object.keys(fotos_usuarios);

	    			idUsuarios.forEach(function (idUsuario) {
	    				var photosArray = fotos_usuarios[idUsuario];
	    				if (photosArray.length < 1) return false;
	    				var photosIds = _.map(photosArray, function (photo) {
  							return photo.split('.')[0]
  						});
  						console.log(idUsuario, '--->', photosIds);
	    				cloudinarTasks.push(function (callback){
    						cloudinary.v2.uploader.add_tag(idUsuario, photosIds, function (err, result) {
    							if (err) {
    								console.log(err);
    								callback(err, null);
    							}
    							callback(null, result);
    						});
	    				});
	    			});
	    			console.log('-------------------------------------');
	    			console.log('cloudinarTasks: ' + cloudinarTasks.length, cloudinarTasks);
	    			async.parallel(cloudinarTasks, function (err, results) {
  						done();
  					})
	    			
	    		})

    		})
    });
  });

});