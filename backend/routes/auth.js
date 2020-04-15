const exp = require('express');
const fs = require('fs');
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
	app.firestore().settings({timestampsInSnapshots: true});
	return app.firestore();
}

router.get('/', (req, res, next) => {
	fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get\n');
	
	const email = req.headers.username;
	const password = req.headers.password;
	
	let fbApp;
	if (!fb.apps.length) {
		try {
			initFirebase();
		} catch (err) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : Error initializing Firebase; err = ' + err + '\n');
			res.status(500).send('Error initializing Firebase.');
			return;
		}
	}
	fbApp = fb.apps[0];
	fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : Firebase initialized.\n');
	
	fb.apps[0].auth().signInWithEmailAndPassword(email, password).then(user => {
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : user ' + email + ' successfully signed in.\n');
		res.status(200).send(JSON.stringify(user));
	}).catch(err => {
		res.status(401).send();
	});

});

module.exports = router;