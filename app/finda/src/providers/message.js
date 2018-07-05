import {apiURL} from '../config'
import MeProvider from './me'
import Http from './http'
import AuthProvider from './auth'
export default class MessageProvider {
  static singleton = null
  static getInstance() {
    if(!MessageProvider.singleton) MessageProvider.singleton = new MessageProvider()
    return MessageProvider.singleton
  }

  constructor() {
    this.authProvider = AuthProvider.getInstance()
  }
  async getAllConversations() {
    let url = `/message`
    let response = await this.authProvider.authenticatedGet(url)
    return response.json()
  }

  async getConversation(userId) {
    let url = `/message/${userId}`
    let response = await this.authProvider.authenticatedGet(url)
    return response.json()
  }

  async addMessage(userId,message) {
    let url = `/message/${userId}`
    let response = await this.authProvider.authenticatedPost(url,{message})
    return response.json()
  }
}
