import axios from "axios";
import { makeAutoObservable } from "mobx";
import tokenServices from "../tokenServices";
import { storageSelectors } from "../storageSelectors";

axios.defaults.baseURL = "http://road-rules-backend.webtm.ru/";

interface IUserInfo {
  firstName: string;
  secondName: string;
  email: string;
}

interface ILocalStorageUserInfo {
  firstName: string;
  secondName: string;
  email: string;
  token: string;
}

const getLocalStorageUserInfo = (): ILocalStorageUserInfo | null => {
  const storedData = localStorage.getItem(storageSelectors.userInfo);
  return storedData ? JSON.parse(storedData) : null;
};

const localStorageUserInfo = getLocalStorageUserInfo();

export class AuthStore {
  userInfo: IUserInfo | null;
  isLoading: boolean;
  isAuth: boolean;

  constructor() {
    this.userInfo = {
      firstName: localStorageUserInfo?.firstName || "",
      secondName: localStorageUserInfo?.secondName || "",
      email: localStorageUserInfo?.email || "",
    };
    this.isAuth = !!localStorageUserInfo?.token;
    this.isLoading = false;
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  login(userInfo: IUserInfo, token: string) {
    tokenServices.set(token);
    this.isAuth = true;
    this.userInfo = userInfo;

    const localStorageUserInfo = { ...userInfo, token };

    localStorage.setItem(storageSelectors.userInfo, JSON.stringify(localStorageUserInfo));
  }

  logout() {
    localStorage.removeItem(storageSelectors.userInfo);

    tokenServices.unset();
    this.userInfo = null;
    this.isAuth = false;
  }
}

const authStore = new AuthStore();
export default authStore;
