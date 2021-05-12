import axios from "axios";
import { baseUrl } from "./constants";
import auth from "./core/auth";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.request.use(function (config) {
    const auth_token = auth.token;
    if(window.location.pathname !== "/auth/login"){
        if(auth_token){
            config.headers['Authorization'] = 'Bearer ' + auth_token;
        }else{
            auth.logout();
            //console.log("request,,");
            window.location.replace("/auth/login");
        }
    }
    return config;

}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (config) {

    return config;

}, async function (error) {

    if(window.location.pathname !== "/auth/login" && error?.response?.status === 401){
        auth.logout();
        //console.log("response,,");
        window.location.replace("/auth/login");
    }

    return Promise.reject(error);
});

export default axiosInstance;