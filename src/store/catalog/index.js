import StateModule from "../module";
import qs from '../../utils/search-params';
import diff from "../../utils/diff";


class CatalogState extends StateModule {
  initState() {
    return {
      items: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: ''
      },
      waiting: false
    };
  }

  async initParams(params = {}) {
    const urlParams = qs.parse(window.location.search);
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;
    if (urlParams.category) validParams.category = urlParams.category;

    const newParams = { ...this.initState().params, ...validParams, ...params };
    await this.setParams(newParams, true);
  }


  async resetParams(params = {}) {
    const newParams = { ...this.initState().params, ...params };
    await this.setParams(newParams);
  }


  async setParams(params = {}, historyReplace = false) {
    const newParams = { ...this.getState().params, ...params };

    this.setState({
      ...this.getState(),
      params: newParams,
      waiting: true
    }, 'Смена параметров каталога');

    const apiParams = diff({
      limit: newParams.limit,
      skip: (newParams.page - 1) * newParams.limit,
      fields: 'items(*),count',
      sort: newParams.sort,
      search: {
        query: newParams.query,
        category: newParams.category
      }
    }, { skip: 0, search: { query: '', category: '' } });


    const json = await this.services.api.request({ url: `/api/v1/articles${qs.stringify(apiParams)}` });


    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Обновление списка товара');

    // Запоминаем параметры в URL, которые отличаются от начальных
    let queryString = qs.stringify(diff(newParams, this.initState().params));
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }
}

export default CatalogState;
