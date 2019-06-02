import request from "../common/request";

const authCheck =  async () => await request.patch("/user")
    .then(({data}) => data)
    .catch(error => Promise.reject(error));

export const authService = {
    authCheck
};
