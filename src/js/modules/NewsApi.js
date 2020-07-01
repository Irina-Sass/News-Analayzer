import { BASE_URL } from '../constants/NewsApiConstants.js';

export class NewsApi {
  constructor(apiKey) {
    this.baseUrl = BASE_URL;
    this.apiKey = apiKey;
  }

  getNews(keyword, from, to, pageSize, language, sortBy) {
    const _proxy = 'https://praktikum.tk/';
    const _url = `${_proxy}${this.baseUrl}/v2/everything?q=${keyword}&from=${from}&to=${to}&pageSize=${pageSize}&language=${language}&sortBy=${sortBy}&apiKey=${this.apiKey}`;
    console.log(_url);
    return fetch(_url, { method: 'GET' }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
