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

router.post('/', (req, res, next) => {
	fs.appendFileSync('log.txt', Date.now() + ': in blog.js : router.post\n');

	const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
		fs.appendFileSync('log.txt', Date.now() + ': Data chunked\n');
		
        const data = JSON.parse(chunks);
		const post = {};
		post.title = data.title;
		post.body = data.body;
		post.createdAt = Date.now();
		post.updatedAt = post.createdAt;
		
		axios.post('/blogposts.json', post).then(response => {
			fs.appendFileSync('log.txt', Date.now() + ': Blog posted.\n');
			res.status(200).send(JSON.stringify(response.data));
		}).catch(err => {
			fs.appendFileSync('log.txt', Date.now() + ': Error posting blog post: ' + err + '\n');
			res.status(500).send('Error posting blog post.');
		});
	});
});

router.patch('/', (req, res, next) => {
	fs.appendFileSync('log.txt', Date.now() + ': in blog.js : router.patch\n');

	const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
		fs.appendFileSync('log.txt', Date.now() + ': Data chunked\n');
		
        const data = JSON.parse(chunks);
		const post = data.post;
		const postId = data.postId;
		post.updatedAt = Date.now();	
		
		axios.patch('/blogposts/' + postId + '.json', post, {headers: {'Content-Type': 'application/json'}}).then(response => {
			fs.appendfilesync('log.txt', date.now() + ': blog patch.\n');
			res.status(200).send(json.stringify(response.data));
		}).catch(err => {
			fs.appendfilesync('log.txt', date.now() + ': error patching blog post: ' + err + '\n');
			res.status(500).send('error patching blog post.');
		});
	});
});

module.exports = router;