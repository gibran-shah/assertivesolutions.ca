const exp = require('express');
const fs = require('fs');
const axios = require('./axios-instance');

const router = exp.Router();

router.get('/', (req, res, next) => {
	fs.appendFileSync('log.txt', Date.now() + ': in blog.js : router.get\n');

	axios.get('/blogposts.json').then(response => {
		fs.appendFileSync('log.txt', Date.now() + ': Blogs retrieved.\n');
		res.status(200).send(JSON.stringify(response.data));
	}).catch(err => {
		fs.appendFileSync('log.txt', Date.now() + ': Error fetching blogs: ' + err + '\n');
		res.status(500).send('Error fetching blogs.');
	});
	
	fs.appendFileSync('log.txt', Date.now() + ': done\n');
});

module.exports = router;