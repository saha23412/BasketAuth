import StateModule from "../module";


class BasketState extends StateModule {

  initState() {
    return {
      items: [],
      sum: 0,
      amount: 0
    };
  }
  async addToBasket(_id) {
    let sum = 0;
    let exists = false;
    const items = this.getState().items.map(item => {
      let result = item;
      if (item._id === _id) {
        exists = true;
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result
    });

    if (!exists) {
      const json = await this.services.api.request({ url: `/api/v1/articles/${_id}` });

      const item = json.result;
      items.push({ ...item, amount: 1 });
      sum += item.price;
    }

    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Добавление в корзину');
  }

  removeFromBasket(_id) {
    let sum = 0;
    const items = this.getState().items.filter(item => {
      if (item._id === _id) return false
      sum += item.price * item.amount;
      return true;
    });
    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Удаление из корзины')
  }
}

export default BasketState;
