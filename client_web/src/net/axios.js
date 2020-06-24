import developmentConfig from '../configs/development.json'
import productionConfig from '../configs/production.json'
import axios from "axios"
import { fetchAuthToken, updateAuthToken } from "../storage/local"

//
var hostConfigMap;

if(process.env.NODE_ENV === 'development') 
{
    hostConfigMap = developmentConfig;
}

if(process.env.NODE_ENV === 'production') 
{
    hostConfigMap = productionConfig;
}

//
class Axios 
{
  constructor(host)
  {
    this.host = host;

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

    //
    return res.data
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
