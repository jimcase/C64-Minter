import axios from 'axios';

const apiUrl = 'http://localhost:9002';

// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({ baseURL: apiUrl });
