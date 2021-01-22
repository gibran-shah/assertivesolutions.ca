import axios from 'axios';

const instance = axios.create({
   // baseURL: 'http://35.184.181.105:3000',
    baseURL: 'http://localhost:3001',
    headers: {'Access-Control-Allow-Origin': '*'}
});

export default instance;