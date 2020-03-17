const exp = require('express');
const fs = require('fs');
const axios = require('./axios-instance');

const router = exp.Router();

router.get('/', (req, res, next) => {
	fs.appendFileSync('log.txt', Date.now() + ': in blog.js : router.get\n');
	
	const post = {
		createdat: Date.now(),
		updatedat: Date.now(),
		title: 'strong bo',
		body: 'do you have strong bo? well, sucks to be you.'
	};

	axios.post('/blogpost.json', post).then(response => {
		fs.appendFileSync('log.txt', Date.now() + ': response = ' + response + '\n');
	}).catch(err => {
		fs.appendFileSync('log.txt', Date.now() + ': err = ' + err + '\n');
	});
	
	fs.appendFileSync('log.txt', Date.now() + ': done\n');
	
	res.status(200).send('Hello from blog!!!');
});

module.exports = router;