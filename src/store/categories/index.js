import StateModule from "../module";
import qs from "../../utils/search-params";


class CategoriesState extends StateModule {


  initState() {
    return {
      items: [],
      waiting: false
    };
  }

  async load() {
    this.setState({ waiting: true, items: [] }, 'Ожидание загрузки категорий');

    const params = { fields: '_id,title,parent(_id)', limit: '*' };
    const json = await this.services.api.request({ url: `/api/v1/categories/${qs.stringify(params)}` });


    this.setState({
      items: json.result.items,
      waiting: false
    }, 'Катеории загружены');
  }
}

export default CategoriesState;
