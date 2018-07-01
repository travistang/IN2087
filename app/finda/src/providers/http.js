"use strict";
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


  //get method from the sample project
    static get2(url, onSuccess, onError) {
        let header = new Headers();
      /*  if(token) {
            header.append('Authorization', `JWT ${token}`);
        }*/

        fetch(url, {
            method: 'GET',
            headers: header
        }).then((resp) => {

                return resp.json();

        }).then((resp) => {
            if(resp.error) {

            }
            else {

                onSuccess(resp);
            }
        }).catch((e) => {

        });
    }



}
