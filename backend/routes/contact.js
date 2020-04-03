const exp = require('express');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');

const router = exp.Router();

// router.post('/', (req, res, next) => res.status(200).send('contact post!!!'));
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

		sgMail.setApiKey('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');
		
		const msg = {
			to: 'gshah@assertivesolutions.ca',
			from: 'asbackend@assertivesolutions.ca',
			subject: 'Assertive Solutions Contact Form',
			text: emailBody,
			html: '<strong><i>' + emailBody + '</i></strong>'
		};
		
		sgMail.send(msg).then(result => {
			fs.appendFileSync('log.txt', new Date().toString() + ': Email sent\n');
			res.status(200).send('Email successfully sent.');
		}).catch(err => {
			res.status(500).send('Error sending email.');
		});
    });
});

module.exports = router;