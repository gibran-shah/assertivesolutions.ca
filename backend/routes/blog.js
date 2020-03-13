const exp = require('express');
const fs = require('fs');
const axios = require('axios');

const router = exp.Router();

router.get('/', (req, res, next) => {
	fs.appendFileSync('log.txt', Date.now() + ': in blog.js : router.get\n');
	
	const axiosinstance = axios.create({
		baseurl: 'https://assertivesolutions-d01a1.firebaseio.com/'
	});
	
	fs.appendFileSync('log.txt', Date.now() + ': Created axiosinstance\n');
	
	const post = {
		createdat: Date.now(),
		updatedat: Date.now(),
		title: 'strong bo',
		body: 'do you have strong bo? well, sucks to be you.'
	};
	axiosinstance.post('/blogpost.json', post).then(response => {
		fs.appendFileSync('log.txt', Date.now() + ': response = ' + response + '\n');
	}).catch(err => {
		fs.appendFileSync('log.txt', Date.now() + ': err = ' + err + '\n');
	});
	
	fs.appendFileSync('log.txt', Date.now() + ': done\n');
	
	res.status(200).send('Hello from blog');
});

module.exports = router;