const exp = require('express');
const fs = require('fs');
const fb = require('firebase');
const fbAdmin = require('firebase-admin');

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
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : Firebase initialized.\n');
	}
	fbApp = fb.apps[0];
	
	fbApp.auth().signInWithEmailAndPassword(email, password).then(user => {
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : user ' + email + ' successfully signed in.\n');
		res.status(200).send(JSON.stringify(user));
	}).catch(err => {
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : Login failed for user ' + email + '.\n');
		res.status(401).send();
	});

});

router.get('/signout', async (req, res, next) => {
	fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout\n');
	
	const accessToken = req.headers.authorization;

	if (!accessToken) {
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout : No Authorization token.\n');
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
			fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout : Error initializing firebase admin; err = ' + err + '\n');
			res.status(500).send('Error initializing firebase admin.');
			return;
		}
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout : Firebase Admin initialized.\n');
	}
	
	fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout. fbAdmin is initialized.\n');
	
	let decodedToken;
	try {
		decodedToken = await fbAdmin.auth().verifyIdToken(accessToken);
	} catch (err) {
		fs.appendFileSync('log.txt', new Date().toString() + ': in blog.js : router.auth/signout : Error verifying access token; err = ' + err + '\n');
		res.status(401).send('Unauthorized');
		return;
	}
	
	fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout. Access token is valid.\n');
	
	let fbApp;
	if (!fb.apps.length) {
		try {
			initFirebase();
		} catch (err) {
			fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : Error initializing Firebase; err = ' + err + '\n');
			res.status(500).send('Error initializing Firebase.');
			return;
		}
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get : Firebase initialized.\n');
	}
	fbApp = fb.apps[0];
	
	fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout. Acquired Firebase Application.\n');
	
	fbApp.auth().signOut().then(() => {
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout : user signed out.\n');
		res.status(200).send();
	}).catch(err => {
		fs.appendFileSync('log.txt', new Date().toString() + ': in auth.js : router.get/signout : Signout failed.\n');
		res.status(500).send();
	});

});

module.exports = router;