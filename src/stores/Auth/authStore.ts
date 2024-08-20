import axios from "axios";
import { makeAutoObservable } from "mobx";
import tokenServices from "../tokenServices";

axios.defaults.baseURL = "http://road-rules-backend.webtm.ru/";

interface IUserInfo {
  firstName: string;
  secondName: string;
  email: string;
}

interface IAuth {
  userInfo: IUserInfo;
  isLoading: boolean;
  isAuth: boolean;
}

export class AuthStore implements IAuth {
  userInfo = {
    firstName: "",
    secondName: "",
    email: "",
  };
  isLoading = false;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  login(userInfo: IUserInfo, token: string) {
    tokenServices.set(token);
    this.setIsAuth(true);
    this.userInfo = userInfo;
  }

  logout() {
    tokenServices.unset();
    this.userInfo = {
      firstName: "",
      secondName: "",
      email: "",
    };
    this.isAuth = false;
  }
}

const authStore = new AuthStore();
export default authStore;
