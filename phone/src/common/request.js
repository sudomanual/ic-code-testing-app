import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"
import { API_URL, STORAGE_TOKEN_KEY } from "react-native-dotenv"
import { toastError } from "./toaster"

axios.interceptors.response.use(
    response => response,
    error => {
        if(error.response) {
            if (error.response.status == 404) {
                toastError(`Content not found.`)
            }
            if (error.response.status == 422) {
                let errors = error.response.data,
                    messages = ""
                for (let index in errors) {
                    let error = errors[index]
                    for (let field in error) {
                        messages += `${error[field]} \n`
                        break
                    }
                }
                toastError(messages.trim("\n"))
            }
            if (error.response.status === 403) {
                toastError("Access denied.")
            }
            if (error.response.status === 401) {
                toastError(error.response.data.message)
            }
        }
        if( ! error.response) {
            toastError(`Unable to connect to api ${API_URL}.`)
        }
        return Promise.reject(error)
    }
);

const request = async (url, data, method) => {
    const { params } = data
    const token = await AsyncStorage.getItem(STORAGE_TOKEN_KEY)
    return axios({
        method,
        url,
        baseURL: API_URL,
        responseType: "json",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        data,
        params
    })
};

export default {
    get: (url, params = {}) => request(url, { params }, "GET"),
    put: (url, data = {}) => request(url, data, "PUT"),
    post: (url, data = {}) => request(url, data, "POST"),
    delete: (url, data = {}) => request(url, data, "DELETE"),
    patch: (url, data = {}) => request(url, data, "PATCH"),
};