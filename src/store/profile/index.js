import StateModule from "../module";


class ProfileState extends StateModule {


  initState() {
    return {
      data: {},
      waiting: false
    };
  }
  async load() {
    this.setState({
      waiting: true,
      data: {}
    }, 'Ожидание загрузки профиля');

    try {
      const json = await this.services.api.request({ url: '/api/v1/users/self' });
      this.setState({
        data: json.result,
        waiting: false
      }, 'Профиль загружен');
    } catch (e) {
      this.setState({
        data: {},
        waiting: false
      }, 'Ошибка загрузки профиля');
    }
  }
}

export default ProfileState;
