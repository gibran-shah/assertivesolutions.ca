const exp = require('express');
const fs = require('fs');
const fb = require('firebase');
const fbAdmin = require('firebase-admin');
const fbs = require('@firebase/storage');
// https://flaviocopes.com/express-forms-files/
const formidable = require('formidable');

const router = exp.Router();

const initFirebase = () => {
	const config = {
		apiKey: "AIzaSyBMNSJZZIhFPG3FNjqy5mf2v16fs_L7UhU",
		authDomain: "assertivesolutions2.firebaseapp.com",
		databaseURL: "https://assertivesolutions2.firebaseio.com",
		projectId: "assertivesolutions2",
		storageBucket: "gs://assertivesolutions2.appspot.com",
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
	
	new formidable.IncomingForm().parse(req, async (err, fields, files) => {
		if (err) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Error parsing form.\n');
			res.status(500).status('Error parsing form.');
			return;
		}
		
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : form parsed.\n');
		
		const accessToken = req.headers.authorization;

		if (!accessToken) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : No Authorization token.\n');
			res.status(401).status('Unauthorized');
			return;
		}
		
		if (!fbAdmin.apps.length) {
			try {
				const serviceAccount = require("C:/inetpub/wwwroot/assertivesolutions/backend/assertivesolutions2-firebase-adminsdk-zrq1r-0292d968e4.json");
				fbAdmin.initializeApp({
					credential: fbAdmin.credential.cert(serviceAccount),
					databaseURL: 'https://assertivesolutions2.firebaseio.com'
				});
			} catch (err) {
				fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Error initializing firebase admin; err = ' + err + '\n');
				res.status(500).send('Error initializing firebase admin.');
				return;
			}
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Firebase Admin initialized.\n');
		}
		
		let decodedToken;
		try {
			decodedToken = await fbAdmin.auth().verifyIdToken(accessToken);
		} catch (err) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Error verifying access token; err = ' + err + '\n');
			res.status(401).send('Unauthorized');
			return;
		}
	
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : User ' + decodedToken.email + ' is authorized to post.\n');
		
		const post = {};
		post.title = fields.title;
		post.body = fields.body;
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
		
		if (files && files.image) {
			// image = {
			// 	size: 22059,
			// 	path: "C:\\Windows\\TEMP\\upload_de9718c33e999ea496a5cb0ce01d37c4",
			// 	name: "castle (sketch).jpg",
			// 	type: "image/jpeg",
			// 	mtime: "2020-05-12T02:28:21.839Z"
			// }
			try {
				const bucket = fbAdmin.storage().bucket('gs://assertivesolutions2.appspot.com');
				const result = await bucket.upload(files.image.path, {metadata: {contentType: files.image.type}});
				const file = bucket.file(result[0].metadata.name);
				post.imageUrl = await file.getSignedUrl({ action: 'read', expires: '03-09-2400'});
				fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Image url: ' + post.imageUrl + '\n');
			} catch (err) {
				fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.post : Error storing image or retrieving image URL. err:' + err + '\n');
			}
		}
		
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

	new formidable.IncomingForm().parse(req, async (err, fields, files) => {
		if (err) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Error parsing form.\n');
			res.status(500).status('Error parsing form.');
			return;
		}
		
		const accessToken = req.headers.authorization;

		if (!accessToken) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : No Authorization token.\n');
			res.status(401).status('Unauthorized');
			return;
		}
		
		if (!fbAdmin.apps.length) {
			try {
				const serviceAccount = require("C:/inetpub/wwwroot/assertivesolutions/backend/assertivesolutions2-firebase-adminsdk-zrq1r-0292d968e4.json");
				fbAdmin.initializeApp({
					credential: fbAdmin.credential.cert(serviceAccount),
					databaseURL: 'https://assertivesolutions2.firebaseio.com'
				});
			} catch (err) {
				fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Error initializing firebase admin; err = ' + err + '\n');
				res.status(500).send('Error initializing firebase admin.');
				return;
			}
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Firebase Admin initialized.\n');
		}
		
		let decodedToken;
		try {
			decodedToken = await fbAdmin.auth().verifyIdToken(accessToken);
		} catch (err) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Error verifying access token; err = ' + err + '\n');
			res.status(401).send('Unauthorized');
			return;
		}
	
		const postId = fields.postId;
		const post = {
			title: fields.title,
			body: fields.body,
			updatedAt: Date.now()
		};	
		
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
			res.status(200).send({updatedAt: post.updatedAt});
		}).catch(err => {
			fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.patch : Error patching blog post: ' + err + '\n');
			res.status(500).send('Error patching blog post.');
		});
	});
});

module.exports = router;

// https://stackoverflow.com/questions/61298999/how-to-write-a-firebase-rule-to-check-access-token