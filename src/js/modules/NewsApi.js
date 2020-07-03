export class NewsApi {
  constructor(apiKey, BASE_URL) {
    this.baseUrl = BASE_URL;
    this.apiKey = apiKey;
  }

  getNews(keyword, from, to, pageSize, language, sortBy) {
    console.log(this.baseUrl);
    const _url = `${this.baseUrl}/v2/everything?q=${keyword}&from=${from}&to=${to}&pageSize=${pageSize}&language=${language}&sortBy=${sortBy}&apiKey=${this.apiKey}`;
    return fetch(_url, { method: 'GET' }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
