import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://assertivesolutions-d01a1.firebaseio.com/'
});

export default instance;