const exp = require('express');
const contactRoutes = require('./routes/contact');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');

fs.appendFileSync('log.txt', 'test');

dotenv.config();

const app = exp();
const port = process.env.PORT;
const corsOptions = {
    origin: ['http://localhost:3000', 'http://www.assertivesolutions.ca', 'https://www.assertivesolutions.ca'],
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use('/contact', contactRoutes);;

app.listen(port);
console.log('Server running on port', port)

module.exports = app;