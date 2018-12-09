import Vue from 'vue';
import { ResponseRequestError } from './ResponseObjects';


export default class Api {
  static request(method = 'get', url, data = null) {
    return Vue
      .axios[method](`${url}`, data)

      .then(response => response.data)

      .catch(e => new ResponseRequestError(e.message));
  }

  static get(url) { return this.request('get', url); }

  static post(url, data = null) { return this.request('post', url, data); }

  static put(url, data = null) { return this.request('put', url, data); }

  static delete(url) { return this.request('delete', url); }


  /**
   * Отправка данных в виде FormData
   * @param url
   * @param dataObject
   * @param method
   * @returns {*}
   */
  static sendData(url, dataObject, method = 'post') {
    const formData = new FormData();

    Object.keys(dataObject)
      .forEach((property) => {
        let value = dataObject[property];

        if (typeof value === 'object') {
          value = JSON.stringify(value, null, ' ');
        }

        formData.append(property, value);
      });

    return this[method](url, formData);
  }


  /**
   * Отправка массива данных по ключу в виде FormData
   * @param url
   * @param key
   * @param dataArray
   * @param method
   * @returns {*}
   */
  static sendDataByKey(url, key, dataArray, method = 'post') {
    const formData = new FormData();

    dataArray.forEach((item) => {
      formData.append(key, item);
    });

    return this[method](url, formData);
  }
}
