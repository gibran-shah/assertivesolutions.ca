const exp = require('express');
const nodeMailer = require('nodemailer');

const router = exp.Router();

router.post('/', (req, res, next) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
        const data = JSON.parse(chunks);
        const name = data.firstName + ' ' + data.lastName;
        const email = data.email;
        const phone = data.phone;
        const company = data.company;
        const inquiry = data.inquiry;

        const emailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nInquiry:\n${inquiry}`;

        const transporter = nodeMailer.createTransport({
            service: 'smtp.sendgrid.net',
            port: 25,
            auth: {
                user: 'apikey',
                pass: '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'
            }
        });
        const mailOptions = {
            from: 'Assertive Solutions Inc.',
            to: 'gshah@assertivesolutions.ca',
            subject: 'assertivesolutions.ca contact',
            text: emailBody
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.status(200).send('Message sent.');
            }
        })
    });
});


module.exports = router;