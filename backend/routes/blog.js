const exp = require('express');
const fs = require('fs');
const axios = require('./axios-instance');
const fb = require('firebase');

const router = exp.Router();

const initFirebase = () => {
	const config = {
		apiKey: "AIzaSyBMNSJZZIhFPG3FNjqy5mf2v16fs_L7UhU",
		authDomain: "assertivesolutions2.firebaseapp.com",
		databaseURL: "https://assertivesolutions2.firebaseio.com",
		projectId: "assertivesolutions2",
		storageBucket: "assertivesolutions2.appspot.com",
		messagingSenderId: "1031899362745",
		appId: "1:1031899362745:web:79abbebd6db7d499083268",
		measurementId: "G-8QSQBE00MH"
	};
	const app = fb.initializeApp(config);
	return app.firestore();
}

router.get('/', (req, res, next) => {
	fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.get\n');

	let firestore;
	if (fb.apps.length) firestore = fb.apps[0].firestore();
	else {
		try {
			firestore = initFirebase();
		} catch (err) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.get : Error initializing Firebase; err = ' + err + '\n');
			res.status(500).send('Error initializing Firebase.');
			return;
		}
	}
	fs.appendFileSync('log.txt', new Date().toString() + ': in router.get : Firebase initialized.\n');
	
	firestore.collection('blogposts').get().then(snapshot => {
		fs.appendFileSync('log.txt', new Date().toString() + ': Blogs retrieved.\n');
		const posts = [];
		snapshot.forEach(doc => posts.push({id: doc.id, ...doc.data()}));
		res.status(200).send(JSON.stringify(posts));
	}).catch(err => {
		fs.appendFileSync('log.txt', new Date().toString() + ': Error fetching blogs: ' + err + '\n');
		res.status(500).send('Error fetching blogs.');
	});
});

router.post('/', (req, res, next) => {
	fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post\n');

	if (!req.headers.authorization) {
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : No Authorization token.\n');
		res.status(401).status('Unauthorized');
		return;
	}

	const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Data chunked\n');
		
        const data = JSON.parse(chunks);
		const post = {};
		post.title = data.title;
		post.body = data.body;
		post.createdAt = Date.now();
		post.updatedAt = post.createdAt;
		
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Extracted post. Initializing Firebase.\n');
		
		let firestore;
		if (fb.apps.length) firestore = fb.apps[0].firestore();
		else {
			try {
				firestore = initFirebase();
			} catch (err) {
				fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Error initializing Firebase; err = ' + err + '\n');
				res.status(500).send('Error initializing Firebase.');
				return;	
			}
		}
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Firebase initialized.\n');
		
		firestore.collection('blogposts').add(post).then(docRef => {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Blog posted.\n');
			res.status(200).send(JSON.stringify({id: docRef.id, createdAt: post.createdAt}));
		}).catch (err => {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Error posting blog post: ' + err + '\n');
			res.status(500).send('Error posting blog post.');
		});
	});
});

router.patch('/', (req, res, next) => {
	fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch\n');

	if (!req.headers.authorization) {
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : No Authorization token.\n');
		res.status(401).status('Unauthorized');
		return;
	}
	
	const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Data chunked\n');
		
        const data = JSON.parse(chunks);
		const post = data.post;
		const postId = data.postId;
		post.updatedAt = Date.now();	
		
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Post extracted. Initializing Firebase.\n');
		
		let firestore;
		if (fb.apps.length) firestore = fb.apps[0].firestore();
		else {
			try {
				firestore = initFirebase();
			} catch (err) {
				fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Error initializing Firebase; err = ' + err + '\n');
				res.status(500).send('Error initializing Firebase.');
				return;	
			}
		}
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Firebase initialized.\n');
		
		firestore.collection('blogposts').doc(postId).set(post, {merge: true}).then(() => {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Blog post patched.\n');
			res.status(200).send(JSON.stringify('Post updated.'));
		}).catch(err => {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Error patching blog post: ' + err + '\n');
			res.status(500).send('Error patching blog post.');
		});
	});
});

module.exports = router;

// https://stackoverflow.com/questions/61298999/how-to-write-a-firebase-rule-to-check-access-token