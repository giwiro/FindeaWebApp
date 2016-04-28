/**
 * MailController
 *
 * @description :: Server-side logic for managing mails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const mailgun = require('mailgun-js')(sails.config.mailgun);


module.exports = {
	sendSubscribe: function (req, res) {
		const mail = req.body.email;
    if (!mail) {
    	return res.send('MF003');
    }

    var data = {
			from: mail,
			to: 'contacto@findea.pe',
			subject: 'Suscipción',
			text: 'La persona con correo: ' + mail + ' está interesada en Findea'
		};

		mailgun.messages().send(data, function (error, body) {
			if (error) {
				errorLogHandler(error, req);
				return res.send('MF255');
			}
			console.log('Mailgun envió >> ',body);
			return res.send('MF000');
		});
	}
};

