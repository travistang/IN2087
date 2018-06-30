export default class {
  static async patch(url,data = {},header = {}) {
    return await fetch(url,{
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        ...header
      },
      method: 'PATCH'
    })
  }
  static async delete(url,data = {},header = {}) {
    return await fetch(url,{
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        ...header
      },
      method: 'DELETE'
    })
  }
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
        .join('&');
    let resultURL = `${url}?${queryString}`
    return await fetch(resultURL,{
      headers: {
        "content-type": 'application/json',
        ...header
      }
    })
  }

}
