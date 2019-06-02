import request from "../common/request"

const register = (username, password) => request.put('/user', { username, password })
    .then( ({ data }) => data ).catch(error => {
        return Promise.reject(error);
    })

export const registerService = {
    register
};
