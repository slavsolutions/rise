import axios from 'axios';
import store from '../../store';  // importujemy instancję store'a

const API_BASE_URL = 'https://socialback.bieda.it';

const setupInterceptors = store => {
  axios.interceptors.request.use(config => {
    const token = store.getState().jwt;
     if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

setupInterceptors(store);

const axiosRequests = {
    getAssetTypes: () => {
    axios.post(`${API_BASE_URL}/api/assetType`, {
      requestType: 'getList',
      userData: {} // zgodnie z tym, czego oczekuje backend
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: false
    })
    .then(response => {
      store.dispatch({
        type: 'DATA_UPDATE',
        data: 'assetTypes',
        payload: response.data,
      });
    })
    .catch(error => console.error('POST error:', error));
  },
  
  addAssetCategory: (data) => {
    axios.post(`${API_BASE_URL}/api/assetType`, {
      requestType: 'add',
      userData: data
    },{
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => axiosRequests.getAssetTypes())
    .catch(error => console.error('POST error:', error));
  },

  deleteAssetType: (data) => {
    console.log(data._id);
    axios.post(`${API_BASE_URL}/delAssetType`, {
      payload: data._id,
      withCredentials: false,
    })
    .then(response => axiosRequests.getAssetTypes())
    .catch(error => console.error('POST error:', error));
  },
  getAssetModels: () => {
    axios.post(`${API_BASE_URL}/getData`, {
      requestType: 'getModelList'
    })
    .then(response => {
      store.dispatch({
        type: 'DATA_UPDATE',
        data: 'models',
        payload: response.data,
      })
    })
    .catch(error => console.error('post error:', error));
  },
  deleteAssetModel: (data) => {
    axios.post(`${API_BASE_URL}/getData`, {
      requestType: 'deleteModel',
      modelToDelete: data
    })
    .then(response => {
      console.log(response.data)

    })
    .catch(error => console.error('post error:', error));
  },
  getAssetBrandList: () => {
    axios.post(`${API_BASE_URL}/getData`, {
      requestType: 'getAssetBrandList'
    })
    .then(response => {
      store.dispatch({
        type: 'DATA_UPDATE',
        data: 'assetBrands',
        payload: response.data,
      })

    })
    .catch(error => console.error('post error:', error));
  },
  addAssetBrand: (data) => {
    axios.post(`${API_BASE_URL}/getData`, {
      requestType: 'addAssetBrand',
      brand: data.assetBrand
    })
    .then(response => {
      axiosRequests.getAssetBrandList()
    })
    .catch(error => console.error('post error:', error));
  },
  deleteAssetBrand: (data) => {
    axios.post(`${API_BASE_URL}/getData`, {
      requestType: 'deleteAssetBrand',
      brand: data
    })
    .then(response => {
      console.log(response.data.message._id === data ? 'Asset brand deleted successfully!' : 'Unexpected error occured')
      axiosRequests.getAssetBrandList()
    })
    .catch(error => {
      setTimeout(()=>{
        window.location.reload();
        }, 500)
      alert('Unexpected error - reloading webiste')
    })
  },
  addModel: (data) => {
    console.log('ssssss', data)
    axios.post(`${API_BASE_URL}/getData`, {
      requestType: 'addModel',
      model: data
    })
    .then(response => {
      console.log(response.data.action.name , 'aaa', data.model)
      console.log(response.data.action.name === data.model ? 'New model added successfully!' : 'Unexpected error occured')
      axiosRequests.getAssetModels()
    })
    .catch(error => {
      console.log('aaaasdasfsafsf', error)
      setTimeout(()=>{
        window.location.reload();
        }, 50000)
      alert('Unexpected error - reloading webiste')
    })
  },
};
//axiosRequests.getNewAssetTypes();

export default axiosRequests;