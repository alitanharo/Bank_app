import axios from 'axios';

axios.interceptors.request.use(async (request) => {

    return request;
});


axios.interceptors.response.use(null, async (error) => {
    if (error.response.status === 401 && error.response.config.url === "/api/user/profile") {
        return Promise.reject(error);
    }
    if (error.response.status === 401 && error.response.config.url !== "/api/user/login") {
        window.location.href = '/login';
    }

    return Promise.reject(error);
});


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    head: axios.head,
};
