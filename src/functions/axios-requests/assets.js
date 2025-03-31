import axios from 'axios';
import store from '../../store';  // importujemy instancję store'a

const API_BASE_URL = 'https://socialback.bieda.it';

const axiosRequests = {
  getAssetTypes: () => {
    axios.get(`${API_BASE_URL}/getAssetTypes`, {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      console.log('xxx');
      store.dispatch({
        type: 'UPDATE_DATA_FROM_SERVER',
        payload: response.data
      })
    })
    .catch(error => console.error('GET error:', error));
  },

  addAsset: (data) => {
    console.log('axios post request ',data)
    axios.post(`${API_BASE_URL}/addAssetType`, data, {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.error('POST error:', error));
  }
};

export default axiosRequests;