import { makeAutoObservable } from "mobx";
import tokenServices from "../tokenServices";
import axios from "axios";

axios.defaults.baseURL = "http://road-rules-backend.webtm.ru/";

interface IData {
  firstName: string;
  secondName: string;
  email?: string;
}

interface IAuth {
  data: IData;
  isLoading: boolean;
  isAuth: boolean;
}

export class AuthStore implements IAuth {
  data = {
    firstName: "",
    secondName: "",
    email: "",
  };
  isLoading = false;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    tokenServices.set(token);
  }

  unset() {
    tokenServices.unset();
  }

  logout() {
    this.unset();
    this.data = {
      firstName: "",
      secondName: "",
      email: "",
    };
    this.isAuth = false
  }
}

const authStore = new AuthStore();
export default authStore;
