const exp = require('express');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const aws = require('aws-sdk');

const router = exp.Router();

router.post('/', (req, res, next) => {
	fs.appendFileSync('log.txt', new Date().toString() + ': In contact.js : router.post\n');
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
		fs.appendFileSync('log.txt', new Date().toString() + ': Data chunked\n');
        const data = JSON.parse(chunks);
        const name = data.firstName + ' ' + data.lastName;
        const email = data.email;
        const phone = data.phone;
        const company = data.company;
        const inquiry = data.inquiry;

        const emailBody = `Name: ${name}<br/>Email: ${email}<br/>Phone: ${phone}<br/>Company: ${company}<br/>Inquiry:<br/>${inquiry}`;

		fs.appendFileSync('log.txt', new Date().toString() + ': emailBody = ' + emailBody + '\n');

		aws.config.update({region: 'us-east-1'});
		
		fs.appendFileSync('log.txt', new Date().toString() + ': point 1\n');
		
		const params = {
			Destination: {
				ToAddresses: ['gshah@assertivesolutions.ca']
			},
			Message: {
				Body: {
					Html: {
						Charset: 'UTF-8',
						Data: emailBody
					}
				},
				Subject: {
					Charset: 'UTF-8',
					Data: 'Assertive Solutions Contact Form'
				}
			},
			Source: 'no-reply@assertivesolutions.ca'
		};
		
		const credentials = new aws.SharedIniFileCredentials({profile: 'default'});
		aws.config.credentials = credentials;
		
		fs.appendFileSync('log.txt', new Date().toString() + ': AWS SES credentials set.\n');
		
		const sendPromise = new aws.SES({apiVersion: '2022-11-01'}).sendEmail(params).promise();
		sendPromise.then(
			function(data) {
				fs.appendFileSync('log.txt', new Date().toString() + ': Email sent\n');
				res.status(200).send('Email successfully sent.');
		}).catch(
			function(err) {
				fs.appendFileSync('log.txt', new Date().toString() + ': Error sending email: ' + err + '\n');
				res.status(500).send('Error sending email.');
		});
    });
});

module.exports = router;