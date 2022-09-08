import StateModule from "../module";

class LocaleState extends StateModule{


  initState() {
    return {
      lang: 'ru',
    };
  }

  async setLang(lang) {
    this.setState({
      lang
    }, 'Смена локали');
  }
}

export default LocaleState;
