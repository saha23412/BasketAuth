import Store from "./store";
import APIService from "./api";
import { createStore } from "redux";
import createStoreRedux from "./store-redux";

class Services {

  constructor(config) {
    this.config = config;
  }


  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }
  get storeRedux() {
    if (!this._storeRedux) {
      this._storeRedux = createStoreRedux(this, this.config.storeRedux);
    }
    return this._storeRedux;
  }
}

export default Services;
