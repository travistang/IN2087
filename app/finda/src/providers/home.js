import {apiURL} from '../config'
import Http from './http'

export default class HomeProvider {
  static singleton = null
  static getInstance() {
    if(!HomeProvider.singleton) HomeProvider.singleton = new HomeProvider()
    return HomeProvider.singleton
  }

  constructor() {

  }

  async gethomeContent() {
    let content = await Http.get(`${apiURL}/home`)

    let result = await content.json()
    console.log(result)
    return result
  }
}
