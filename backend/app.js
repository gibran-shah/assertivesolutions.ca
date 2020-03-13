const exp = require('express');
const cors = require('cors');
//const dotenv = require('dotenv');
const fs = require('fs');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blog');

const app = exp();

//dotenv.config();
fs.appendFileSync('log.txt', 'process.env.PORT = ' + process.env.PORT + '\n');
//const port = 3001;
const port = process.env.PORT;

const corsOptions = {
    origin: [
		'http://localhost:3000',
		//'http://localhost:3000/blog',
		'http://www.assertivesolutions.ca',
		'https://www.assertivesolutions.ca',
		'http://assertivesolutions.ca',
		'https://assertivesolutions.ca',
	],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

fs.appendFileSync('log.txt', 'CORS set up.\n');

/*
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
*/

//app.options('/contact', cors(corsOptions));

app.use('/contact', contactRoutes);

/*
app.get('/contact', (req, res, next) => {
	res.status(200).send('GET SUCCESS!!!');
});

app.post('/contact', (req, res, next) => {
	res.status(200).send('POST SUCCESS!!!');
});
*/

app.use('/blogs', blogRoutes);

app.listen(port);

fs.appendFileSync('log.txt', 'Listening on port ' + port + '\n');

module.exports = app;


// Setting up CORS: https://dzone.com/articles/cors-in-node and this: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
// Returning error message in cors callback function: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
