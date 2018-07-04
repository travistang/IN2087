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

  async searchWants(term) {
    let url = new URL(`${apiURL}/search/want`)
    let result = await Http.get(url,{
      q: term
    })
    result = await result.json()
    console.log('search wants result')
    console.log(result)
    return result
  }
  async searchOffers(term) {

  }
  async searchGroups(term) {

  }
  async searchCategories(term) {

  }
}
