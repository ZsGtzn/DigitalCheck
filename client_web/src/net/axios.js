import config from '../configs/index'
import axios from "axios"
import { fetchAuthToken, updateAuthToken } from "../storage/local"
import { inactiveAuthMobileState } from "../storage/mobile";

import store from "../store"
import { isWeChat } from "../utils"
import router from "../router";
import { Indicator } from "mint-ui";

//
var hostConfigMap = config.axios;

//
class Axios {
    constructor(host) {
        this.host = host;
        //
        this.http = axios.create({
            baseURL: host,
            // withCredentials: true
        });

        //
        this.http.interceptors.request.use(function (request) {
            //
            if (request.url.indexOf("noWaitHttpRequest=yes") < 0)
            {
                Indicator.open({
                    spinnerType: 'snake'
                });
            }

            //
            return request;
        }, function (error) {
            //
            Indicator.close();

            //
            return Promise.reject(error);
        });

        this.http.interceptors.response.use(function (response) {
            //
            Indicator.close();

            //
            return response;
        }, function (error) {
            //
            Indicator.close();

            // 
            return Promise.reject(error)
        });
    }

    async apiAxios(method, url, params, options) {
        //
        let headers = Object.assign({
            'Authorization': fetchAuthToken() || "",
        }, options ? options.headers || {} : {});

        //
        if (method === 'POST' || method === 'PUT') {
            headers = Object.assign(headers, {
                'Content-Type': 'application/json;charset=utf-8',
            });
        }
        else {
            headers = Object.assign(headers, {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            });
        }

        //
        if(options)
        {
            options = Object.assign(options, {
                method: method,
                url: url,
                headers: headers,
                data: method === 'POST' || method === 'PUT' ? params : null,
                params: method === 'GET' || method === 'DELETE' ? params : null
            });
        }
        else
        {
            options = {
                method: method,
                url: url,
                headers: headers,
                data: method === 'POST' || method === 'PUT' ? params : null,
                params: method === 'GET' || method === 'DELETE' ? params : null
            }
        }

        //
        const res = await this.http(options);

        if (res.status < 200 || res.status >= 300) {
            await Promise.reject('invalid status code');
        }

        // refresh auth token
        const authToken = res.headers['Authorization'] || res.headers['authorization'];
        if (authToken && authToken.length > 0) {
            updateAuthToken(authToken);
        }


        // check if wechat token is expired, if expired, clear auth corresponding data
        if (isWeChat() && res.data && (res.data.code == 101 || res.data.code == 102)) {
            //
            store.commit("auth/clearWxUserInfo");

            //
            return location.reload();
        }

        // check if mobile token is expired, if expired, clear auth corresponding data
        if (res.data && (res.data.code == 103 || res.data.code == 104)) {
            //
            inactiveAuthMobileState();

            //
            return router.push({
                path: "/putuoNavigator",
            });
        }

        //
        if (res.data && res.data.code == 105)
        {
            return window.location.href = res.data.data;
        }

        //
        return res.data;
    }

    async get(url, params, options) {
        return this.apiAxios('GET', url, params, options)
    }

    async post(url, params, options) {
        return this.apiAxios('POST', url, params, options)
    }

    async put(url, params, options) {
        return this.apiAxios('PUT', url, params, options)
    }

    async delete(url, params, options) {
        return this.apiAxios('DELETE', url, params, options)
    }
}


//
const axiosInstance = {};
for (let name in hostConfigMap) {
    //
    const config = hostConfigMap[name];

    //
    axiosInstance[name] = new Axios(config.host)
}


//
export default axiosInstance
