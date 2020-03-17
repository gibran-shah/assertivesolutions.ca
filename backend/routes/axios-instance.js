const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://assertivesolutions-d01a1.firebaseio.com/'
});

module.exports = instance;