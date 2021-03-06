import {CSRF_TOKEN} from '../config/csrf_token';
import BASEURL from './baseurl';

const handleResponse = (response) => {
  return response.json();
}
    
const apiService = (endpoint, method, data, conToken = true) => {
  // D.R.Y. code to make HTTP requests to the REST API backend using fetch
  const config = {
    method: method || "GET",
    body: data !== undefined ? JSON.stringify(data) : null,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': CSRF_TOKEN,
    }
  };
  if(conToken){
    config.headers.Authorization = `Token ${window.localStorage.getItem("authToken")}`;
  }
  return fetch(`${BASEURL}${endpoint}`, config)
        .then(handleResponse)
        .catch(error => {console.log(error); return error})
}

export default apiService;