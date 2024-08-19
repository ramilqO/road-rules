import { makeAutoObservable } from "mobx";

import { AuthStore } from "./authStore";

class LogoutStore {
  private authStore: AuthStore;

  constructor(authStore: AuthStore) {
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

const authStore = new AuthStore();
const logoutStore = new LogoutStore(authStore);
export default logoutStore;
