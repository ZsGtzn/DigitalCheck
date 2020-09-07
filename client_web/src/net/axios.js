import developmentConfig from '../configs/development.json'
import productionConfig from '../configs/production.json'
import axios from "axios"
import { fetchAuthToken, updateAuthToken, clearAuthToken } from "../storage/local"
import store from "../store"
import { isWeChat } from "../utils"
import router from "../router";

//
var hostConfigMap;

if(process.env.NODE_ENV === 'development') 
{
    hostConfigMap = developmentConfig.axios;
}

if(process.env.NODE_ENV === 'production') 
{
    hostConfigMap = productionConfig.axios;
}

//
class Axios 
{
  constructor(host)
  {
    this.host = host;
    //
    this.http = axios.create({
      baseURL: host,
      // withCredentials: true
    })
  }

  async apiAxios(method, url, params) {
    //
    let headers = {
        'Authorization' : fetchAuthToken() || "",
    }
    if(method === 'POST' || method === 'PUT')
    {
        headers = Object.assign(headers, {
            'Content-Type': 'application/json;charset=utf-8',
        });
    }
    else
    {
        headers = Object.assign(headers, {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        });
    }

    //
    const res = await this.http({
      method: method,
      url: url,
      headers: headers,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null
    });

    if (res.status < 200 || res.status >= 300) {
      await Promise.reject('invalid status code');
    }

    // refresh auth token
    const authToken = res.headers['Authorization'] || res.headers['authorization'];    
    if(authToken && authToken.length > 0)
    {
        updateAuthToken(authToken);
    }


    // check if wechat token is expired, if expired, clear auth corresponding data
    if(isWeChat() && res.data && (res.data.code == 101 || res.data.code == 102))
    {
        //
        store.commit("auth/clearWxUserInfo");

        //
        return location.reload();
    }

    // check if mobile token is expired, if expired, clear auth corresponding data
    if (res.data && (res.data.code == 103 || res.data.code == 104))
    {
        // 
        clearAuthToken();

        //
        return router.push({
            path: "/putuoNavigator",
        });
    }

    //
    return res.data;
  }

  async get (url, params) 
  {
    return this.apiAxios('GET', url, params)
  }

  async post (url, params) 
  {
    return this.apiAxios('POST', url, params)
  }

  async put (url, params) 
  {
    return this.apiAxios('PUT', url, params)
  }

  async delete (url, params) 
  {
    return this.apiAxios('DELETE', url, params)
  }
}


//
const axiosInstance = {};
for(let name in hostConfigMap)
{
    //
    const config = hostConfigMap[name];

    //
    axiosInstance[name] = new Axios(config.host)
}


//
export default axiosInstance
