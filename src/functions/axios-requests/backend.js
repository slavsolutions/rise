import axios from 'axios';

const API_BASE_URL = 'https://socialback.bieda.it';

const backendRequests = {
    isserverup: () => {
      console.log('odpalam zapytanie backendu');
      return axios.get(`${API_BASE_URL}/isserverup`, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };
  export default backendRequests;