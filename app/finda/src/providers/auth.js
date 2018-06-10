import {apiURL} from "../config"
import Http from './http'
export default class AuthProvider {
  static singleton = null
  static getInstance() {
    if(!AuthProvider.singleton)AuthProvider.singleton = new AuthProvider()
    return AuthProvider.singleton
  }

  constructor() {
    this.token = null
  }
  isLoggedIn() {
    return this.token != null
  }
  logout() {
    this.token = null
  }
  // here it assumes that all the required fields are there
  async register(payload) {
    let response = await Http.post(`${apiURL}/auth/register`,payload)
    let data = await response.json()
    let token = data.token
    if(token) this.token = token
    return token
  }

  async login(username,password) {
    let response = await Http.post(`${apiURL}/auth/login`,{username,password})
    let data = await response.json()
    let token = data.token
    if(token) this.token = token
    return token
  }

  async authenticatedGet(url,params = {}) {
    return await Http.get(`${apiURL}${url}`,params,{
      "x-access-token": this.token
    })
  }

  async authenticatedPost(url,data = {}) {
    return await Http.post(`${apiURL}${url}`,data,{
      "x-access-token": this.token
    })
  }
}
