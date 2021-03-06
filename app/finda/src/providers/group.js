import {apiURL} from '../config'
import MeProvider from './me'
import AuthProvider from './auth'
import Http from './http'
export default class GroupProvider {
  static singleton = null
  static getInstance() {
    if(!GroupProvider.singleton) GroupProvider.singleton = new GroupProvider()
    return GroupProvider.singleton
  }

  constructor() {
    this.meProvider = MeProvider.getInstance()
    this.authProvider = AuthProvider.getInstance()
  }

  async getUserGroups(userId) {
    let user = await this.meProvider.getUser()
    return user.groups
  }

  async info(groupName) {
    let url = `/group/${groupName}/info`
    let response = await this.authProvider.authenticatedGet(url)
    return response.json()
  }

  async joinGroup(groupName) {
    let url = `/group/${groupName}/join`
    let response = await this.authProvider.authenticatedPost(url)
    return response.json()
  }
  async quitGroup(groupName) {
    let url = `/group/${groupName}/quit`
    let response = await this.authProvider.authenticatedPost(url)
    return response.json()
  }

  async addWants(groupname,wants) {
    let url = `/group/${groupname}/wants`
    let payload = {groupname,wants}
    let response = await this.authProvider.authenticatedPost(url,payload)
    return response.json()
  }
  async addOffers(groupname,offers) {
    let url = `/group/${groupname}/offers`
    let payload = {groupname,offers}
    let response = await this.authProvider.authenticatedPost(url,payload)
    return response.json()
  }

  async deleteWants(groupname,wants) {
    let url = `/group/${groupname}/wants`
    let payload = {groupname,wants: wants.wants}
    let response = await this.authProvider.authenticatedDelete(url,payload)
    return response.json()
  }

  async deleteOffers(groupname, offers) {
    let url = `/group/${groupname}/offers`
    let payload = {groupname,offers: offers.offers}
    let response = await this.authProvider.authenticatedDelete(url,payload)
    return response.json()
  }
}
