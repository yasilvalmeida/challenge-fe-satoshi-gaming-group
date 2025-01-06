import axios from 'axios';

export const ApiClient = axios.create({
  baseURL:
    'https://677bccaf20824100c07ad569.mockapi.io/api/v1/projects/',
});
