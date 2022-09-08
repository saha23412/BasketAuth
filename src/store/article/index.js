import StateModule from "../module";

class ArticleState extends StateModule {

  initState() {
    return {
      data: {},
      waiting: false
    };
  }

  /**
   * Загрузка товаров по id
   */
  async load(id) {
    this.setState({
      waiting: true,
      data: {}
    }, 'Ожидание загрузки товара');

    try {
      const json = await this.services.api.request({ url: `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)` });
      this.setState({
        data: json.result,
        waiting: false
      }, 'Товар по id загружен');
    } catch (e) {

      this.setState({
        data: {},
        waiting: false
      }, 'Ошибка загрузки товара');
    }
  }
}

export default ArticleState;
