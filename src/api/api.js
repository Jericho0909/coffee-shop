import axios from 'axios';

const DbApi = axios.create({
  baseURL: 'http://localhost:3500'
});

export default DbApi;
