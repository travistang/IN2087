import {apiURL} from '../config'
import Http from './http'

export default class SearchProvider {
  static singleton = null
  static getInstance() {
    if(!SearchProvider.singleton) SearchProvider.singleton = new SearchProvider()
    return SearchProvider.singleton
  }

  constructor() {
  }
  async getUserByName(name) {
    let url = new URL(`${apiURL}/search/user`)
    let result = await Http.get(url,{
      username: name
    })
    result = await result.json()
    return result
  }
  async searchWants(term) {
    let url = new URL(`${apiURL}/search/want`)
    let result = await Http.get(url,{
      q: term
    })
    result = await result.json()
    return result
  }
  async searchOffers(term) {
    let url = new URL(`${apiURL}/search/offer`)
    let result = await Http.get(url,{
      q: term
    })
    result = await result.json()
    return result
  }
  async searchGroups(term) {
    let url = new URL(`${apiURL}/search/group`)
    let result = await Http.get(url,{
      q: term
    })
    result = await result.json()
    return result
  }
  async searchCategories(term) {
    let url = new URL(`${apiURL}/search/categories`)
    let result = await Http.get(url,{
      q: term
    })
    result = await result.json()
    return result
  }
}
