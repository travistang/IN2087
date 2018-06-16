import {apiURL} from "../config"
import Http from './http'
export default class AuthProvider {
  static singleton = null
  static getInstance() {
    if(!AuthProvider.singleton)AuthProvider.singleton = new AuthProvider()
    return AuthProvider.singleton
  }

  constructor() {
  }
  isLoggedIn() {
    return !!this.getToken()
  }
  getToken() {
    return window.localStorage.getItem('token')
  }
  setToken(token) {
    return window.localStorage.setItem('token',token)
  }
  logout() {
    window.localStorage.removeItem('token')
  }
  // here it assumes that all the required fields are there
  async register(payload) {
    let response = await Http.post(`${apiURL}/auth/register`,payload)
    let data = await response.json()
    let token = data.token
    if(token) this.setToken(token)
    return token
  }

  async login(username,password) {
    let response = await Http.post(`${apiURL}/auth/login`,{username,password})
    let data = await response.json()
    let token = data.token
    if(token) {
      this.setToken(token)
    }
    return token
  }

  async authenticatedGet(url,params = {}) {
    return await Http.get(`${apiURL}${url}`,params,{
      "x-access-token": this.getToken()
    })
  }

  async authenticatedPost(url,data = {}) {
    return await Http.post(`${apiURL}${url}`,data,{
      "x-access-token": this.getToken()
    })
  }
}
