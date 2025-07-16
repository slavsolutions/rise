import axios from 'axios';
import store from '../../store';

const API_BASE_URL = 'https://socialback.bieda.it';

const testUser = {
    email: 'nikita@gmail.com',
    username: 'nikit-gun',
    role: 'admin1',
    isActive: 'true',
    orgUnit: 'Slav Solutions',
    profile: {
        firstName: 'Nikita',
        lastName: 'Chev...',
        avatarUrl: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
    }
}

const axiosRequestsUsers = {
    addUser: (data) => {
        console.log('adding user', data)
        axios.post(`${API_BASE_URL}/users`, {
          requestType: 'addUser',
          userData: testUser
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log('adding user error', error)
        })},
    getUsersList: () => {
        console.log('getting users list')
        axios.post(`${API_BASE_URL}/users`, {
          requestType: 'getUsersList'
        })
        .then(response => {
          console.log(response.data);
          store.dispatch({
            type: 'DATA_UPDATE',
            data: 'usersList',
            payload: response.data,
          })
        })
        .catch(error => {
          console.log('adding user error', error)
        })},

}

export default axiosRequestsUsers;