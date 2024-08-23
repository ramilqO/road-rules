import axios from "axios";
import { makeAutoObservable } from "mobx";
import tokenServices from "../tokenServices";

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

interface IAuth {
  userInfo: IUserInfo | null;
  isLoading: boolean;
  isAuth: boolean;
}

const getLocalStorageUserInfo = (): ILocalStorageUserInfo | null => {
  const storedData = localStorage.getItem("userInfo");
  return storedData ? JSON.parse(storedData) : null;
};

const localStorageUserInfo = getLocalStorageUserInfo();

export class AuthStore implements IAuth {
  userInfo: IUserInfo | null;
  isLoading = false;

  isAuth = !!localStorageUserInfo?.token;

  constructor() {
    this.userInfo = {
      firstName: localStorageUserInfo?.firstName || "",
      secondName: localStorageUserInfo?.secondName || "",
      email: localStorageUserInfo?.email || "",
    };

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

    localStorage.setItem("userInfo", JSON.stringify(localStorageUserInfo));
  }

  logout() {
    localStorage.removeItem("userInfo");

    tokenServices.unset();
    this.userInfo = null;
    this.isAuth = false;
  }
}

const authStore = new AuthStore();
export default authStore;
