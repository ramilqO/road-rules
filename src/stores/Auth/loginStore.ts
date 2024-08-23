import axios from "axios";
import type { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";

import errorHandling from "../../tools/errorHandling";
import notificationStore from "../notificationStore";
import authStore from "./authStore";

interface ILoginCredentials {
  email: string;
  password: string;
}

interface ILoginResponse {
  firstName: string;
  secondName: string;
  token: string;
  isAppointExam: boolean;
}

class LoginStore {
  // Перед конструктором ты описываешь типизацию полей класса
  emailFieldIsSuccess: boolean;
  passwordFieldIsSuccess: boolean;

  constructor() {
    // В конструкторе ты уже присваиваешь этим полям значения, тут же можно вставить значения из localStorage если что-то нужно было сохранить
    this.emailFieldIsSuccess = false;
    this.passwordFieldIsSuccess = false;

    makeAutoObservable(this);
  }

  validateEmailField = (value: string): string => {
    if (value.length < 6) {
      this.emailFieldIsSuccess = false;
      return "Почта должна быть не менее 6 символов";
    }
    this.emailFieldIsSuccess = true;
    return "";
  };

  validatePasswordField = (value: string): string => {
    if (value.length < 6) {
      this.passwordFieldIsSuccess = false;
      return "Пароль должна быть не менее 6 символов";
    }
    this.passwordFieldIsSuccess = true;
    return "";
  };

  //TODO: после логина меня должно перенаправлять на страницу меню, но вместо этого поля срасываются и ничего не происходит
  async login(credentials: ILoginCredentials) {
    authStore.setIsLoading(true);
    authStore.setIsAuth(false);
    notificationStore.deleteNotification();

    try {
      const { data }: AxiosResponse<ILoginResponse> = await axios.post(
        "api/auth/login",
        credentials,
      );

      authStore.login(
        {
          firstName: data.firstName,
          secondName: data.secondName,
          email: credentials.email,
        },
        data.token,
      );
    } catch (error) {
      errorHandling(error);
    } finally {
      authStore.setIsLoading(false);
    }
  }
}

const loginStore = new LoginStore();
export default loginStore;
