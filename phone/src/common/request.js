import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
//import { toastError } from '../utils/toastError';

// axios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response.status === 403) {
//             toastError({message: "Access denied!"});
//             error.response.data.errors = {};
//         }
//         if (error.response.status === 401) {
//             toastError({message: "Too Many Attempts."});
//             error.response.data.errors = {};
//         }
//         return Promise.reject(error)
//     }
// );

const request = async (url, data, method) => {
    const { params } = data;
    const token = await AsyncStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios({
        method,
        url,
        baseURL: 'http://localhost/',
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data,
        params
    });
};

export default {
    get: (url, params = {}) => request(url, { params }, 'GET'),
    put: (url, data = {}) => request(url, data, 'PUT'),
    post: (url, data = {}) => request(url, data, 'POST'),
    delete: (url, data = {}) => request(url, data, 'DELETE'),
    patch: (url, data = {}) => request(url, data, 'PATCH'),
};