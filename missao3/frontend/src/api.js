import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://backend:5000', // URL da API Flask
});

export default Api;
