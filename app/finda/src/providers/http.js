export default class {
  static async post(url,data = {},header = {}) {
    return await fetch(url,{
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        ...header
      },
      method: 'POST'
    })
  }
  static async get(url,params = {},header = {}) {
    let esc = encodeURIComponent;
    let queryString = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&')
    let urlObj = new URL(url)
    Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]))
    return await fetch(urlObj,{
      headers: {
        "content-type": 'application/json',
        ...header
      }
    })
  }

}
