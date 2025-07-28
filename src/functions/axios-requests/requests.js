import axios from 'axios';
import store from '../../store';

const API_BASE_URL = 'https://socialback.bieda.it/api';

const requests = {
  getAssetTypes: () => {
    axios.post(`${API_BASE_URL}/assetType`, {
      requestType: 'getList'
    }, {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        console.log(response)
        store.dispatch({
            type: 'UPDATE_ASSETLIST_FROM_SERVER',
            payload: response.data
      });
    })
    .catch(error => console.error('POST error:', error));
  },
};

export default requests