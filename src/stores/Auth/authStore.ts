import { makeAutoObservable } from "mobx";

import helpers from "../../tools/Helpers/helpers";
import api from "../Request/requestsOperations";

import storageSelectors from "../Selectors/storageSelectors";

interface IUserInfo {
  firstName: string;
  secondName: string;
  email: string;
  token: string;
}

const localStorageUserInfo = helpers.getLocalStorage<IUserInfo>(
  storageSelectors.userInfo
);

export class AuthStore {
  userInfo: IUserInfo | null;
  isLoading: boolean;
  isAuth: boolean;

  constructor() {
    this.userInfo = {
      firstName: localStorageUserInfo?.firstName || "",
      secondName: localStorageUserInfo?.secondName || "",
      email: localStorageUserInfo?.email || "",
      token: localStorageUserInfo?.token || "",
    };
    this.isAuth = !!localStorageUserInfo?.token;
    this.isLoading = false;

    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  login(userInfo: IUserInfo) {
    this.userInfo = userInfo;
    this.isAuth = true;

    localStorage.setItem(storageSelectors.userInfo, JSON.stringify(userInfo));
  }

  logout() {
    api.logout();

    this.userInfo = null;
    this.isAuth = false;
    localStorage.removeItem(storageSelectors.userInfo);
  }
}

const authStore = new AuthStore();
export default authStore;
