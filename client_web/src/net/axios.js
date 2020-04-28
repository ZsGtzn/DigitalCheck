import developmentConfig from '../configs/development.json'
import productionConfig from '../configs/production.json'
import axios from "axios"

//
var host;

if(process.env.NODE_ENV === 'development') 
{
  ({ host } = developmentConfig)
}

if(process.env.NODE_ENV === 'production') 
{
  ({ host } = productionConfig)
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
    const res = await this.http({
      method: method,
      url: url,
      headers: method === 'POST' || method === 'PUT' ? {
        'Content-Type': 'application/json;charset=utf-8'
      } : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null
    });

    if (res.status < 200 || res.status >= 300) {
      Vue.prototype.$notify.error({
        title: 'apiAxios',
        message: res
      });
      await Promise.reject('invalid status code');
    }

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


const axiosInstance = new Axios(host)

export default axiosInstance
