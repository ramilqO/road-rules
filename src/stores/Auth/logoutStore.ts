import { makeAutoObservable } from "mobx";

import authStore from "./authStore";

class LogoutStore {
  private authStore: typeof authStore;

  constructor() {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  logout() {
    this.authStore.unset();
    this.authStore.data = {
      firstName: "",
      secondName: "",
      email: "",
    };
  }
}

const logoutStore = new LogoutStore();
export default logoutStore;
