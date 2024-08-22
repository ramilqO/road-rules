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
  userInfo: IUserInfo;
  isLoading: boolean;
  isAuth: boolean;
}

const getLocalStorageUserInfo = (): ILocalStorageUserInfo | null => {
  const storedData = localStorage.getItem("userInfo");
  return storedData ? JSON.parse(storedData) : null;
};

const localStorageUserInfo = getLocalStorageUserInfo();

export class AuthStore implements IAuth {
  userInfo: IUserInfo = {
    firstName: localStorageUserInfo?.firstName || "",
    secondName: localStorageUserInfo?.secondName || "",
    email: localStorageUserInfo?.email || "",
  };
  isLoading = false;
  isAuth = !!localStorageUserInfo?.token;

  emailFieldIsSuccess: boolean = false;
  passwordFieldIsSuccess: boolean = false;
  userPassword: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  validateEmailField = (value: string): string => {
    const basicRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidBasic = basicRegex.test(value);
    const atIndex = value.indexOf("@");
    const domainPart = value.substring(atIndex + 1);

    if (!isValidBasic) {
      this.emailFieldIsSuccess = false;

      if (value.indexOf("@") === -1 && value.length < 5)
        return "Введите имя почты";
      if (!value.includes("@")) return "Почта должна содержать в себе @";
      if (atIndex !== -1 && atIndex === value.length - 1) {
        return "После символа @ должно содержатся доменное имя";
      }
      if (!/\.[a-zA-Z]{2,}$/.test(domainPart)) {
        return "Доменное имя должно заканчиваться на .com, .ru или другой допустимый домен";
      }

      return "Введите корректный адрес электронной почты";
    }

    this.emailFieldIsSuccess = true;
    return "";
  };

  validatePasswordFiled = (value: string): string => {
    if (value.length <= 6) {
      this.passwordFieldIsSuccess = false;
      return "Пароль должен быть не меньше 6 символов";
    }

    this.passwordFieldIsSuccess = true;
    this.userPassword = value;
    return "";
  };

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

    const localStorageUserInfo = { ...userInfo, token };

    localStorage.setItem("userInfo", JSON.stringify(localStorageUserInfo));
  }

  logout() {
    localStorage.removeItem("userInfo");

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
