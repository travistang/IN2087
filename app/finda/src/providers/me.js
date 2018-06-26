import Auth from './auth'

// Providers for interacting with /me endpoint
export default class Me {
  static singleton = null
  static getInstance() {
    if(!Me.singleton)Me.singleton = new Me()
    return Me.singleton
  }

  constructor() {
    this.auth = Auth.getInstance()
    if(this.auth.isLoggedIn()) {
      this.getUser().then(user => this.user = user)
    } else this.user = null
  }

  async getUser() {
    if(this.user) return this.user
    if(!this.auth.isLoggedIn()) return null
    let response = await this.auth.authenticatedGet('/me/info')
    let user = await response.json()
    this.user = user
    return user
  }

  async addWants(want) {
    if(!this.user) {
      return null
    }
    else {
      let response = await this.auth.authenticatedPost('/me/wants',want)
      return response
    }
  }

  async addOffers(offer) {
    if(!this.user) {
      return null
    }
    else {
      let response = await this.auth.authenticatedPost('/me/offers',offer)
      return response
    }
  }
}
