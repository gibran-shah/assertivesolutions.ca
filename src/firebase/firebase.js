const fb = require('firebase');

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

export default app.firestore();