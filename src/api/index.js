class APIService {


  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      baseUrl: '',
      ...config
    }
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }
  async request({url, method = 'GET', headers = {}, ...options}) {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: {...this.defaultHeaders, ...headers},
      ...options,
    });
    return res.json();
  }
  setHeader(name, value = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}

export default APIService;
