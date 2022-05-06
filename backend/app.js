const exp = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = exp();

const port = process.env.PORT;

const corsOptions = {
    origin: [
		'http://localhost:3000',
		'http://www.assertivesolutions.ca',
		'https://www.assertivesolutions.ca',
		'http://assertivesolutions.ca',
		'https://assertivesolutions.ca',
	],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

fs.appendFileSync('log.txt', new Date().toString() + ': CORS set up.\n');

app.use('/contact', contactRoutes);
app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);

app.listen(port);

fs.appendFileSync('log.txt', new Date().toString() + ': app.js is running and listening on port ' + port + '\n');

console.log('Listening on port', port);

module.exports = app;


// Setting up CORS: https://dzone.com/articles/cors-in-node and this: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
// Returning error message in cors callback function: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b

// Stop server from caching javascript: https://stackoverflow.com/questions/34979315/prevent-iisnode-from-caching-required-static-files
// https://stackoverflow.com/questions/60664867/how-do-i-stop-iisnode-on-windows-server-2019-from-caching-my-javascript-files
// Try this: make changes locally and upload file, recycle app pool
