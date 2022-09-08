import StateModule from "../module";

class ModalsState extends StateModule {

  initState() {
    return {
      name: null
    };
  }


  open(name) {
    this.setState({
      name
    }, `Открытие модалки ${name}`);
  }


  close() {
    this.setState({
      name: false
    }, `Закрытие модалки`);
  }
}

export default ModalsState;
