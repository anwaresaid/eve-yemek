import axios from "axios";
import router from "next/router";
import { baseUrl } from "./constants";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.request.use(function (config) {
    const auth_token = localStorage.getItem("access_token");
    if(auth_token){
        config.headers['Authorization'] = 'Bearer ' + auth_token;
    }else{
        localStorage.clear();
        window.location.replace("/auth/login");
    }
    return config;

}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (config) {

    return config;

}, async function (error) {

    if(error?.response?.status === 401){
        await localStorage.clear();
        window.location.replace("/auth/login");
    }

    return Promise.reject(error);
});

export default axiosInstance;