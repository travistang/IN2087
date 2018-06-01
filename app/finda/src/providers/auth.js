import {apiURL} from "../config"
import Http from './http'
class AuthProvider {
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

  async login(username,password) {
    let response = await Http.post(`${apiURL}/auth/login`,{username,password})
    if(Object.keys(response).indexOf('token') == -1)
      throw new Error(response)
    else {
      this.token = response.token
      return response
    }
  }

  async authenticatedGet(url,params = {}) {
    return await Http.get(url,params,{
      "x-access-token": this.token
    })
  }

  async authenticatedPost(url,data = {}) {
    return await Http.post(url,data,{
      "x-access-token": this.token
    })
  }
}
