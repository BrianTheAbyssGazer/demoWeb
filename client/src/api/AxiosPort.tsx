import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
    ? "/api" : 'http://localhost:1337/api';

const AxiosPort = axios.create({
    baseURL,
});

export default AxiosPort;