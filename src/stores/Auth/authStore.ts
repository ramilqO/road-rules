import { makeAutoObservable } from "mobx";
import tokenServices from "../tokenServices";
import axios from "axios";

axios.defaults.baseURL = "http://road-rules-backend.webtm.ru/";

// ХЗ, добавил ещё email на всякий случай, может где-то пригодится
interface IData {
  firstName: string;
  secondName: string;
  email?: string;
}

interface IError {
  message: string;
}

interface IAuth {
  data: IData;
  error: IError;
  isLoading: boolean;
}

export class AuthStore implements IAuth {
  data = {
    firstName: "",
    secondName: "",
    email: "",
  };
  error = {
    message: "",
  };
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    tokenServices.set(token);
  }

  unset() {
    tokenServices.unset();
  }
}

const authStore = new AuthStore()
export default authStore;
