import axios from "axios";
import type { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";

import errorHandling from "../../tools/errorHandling";
import notificationStore from "../notificationStore";
import authStore from "./authStore";

interface IRegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  department: string;
}

interface IRegisterResponse {
  firstName: string;
  secondName: string;
  token: string;
  email: string;
  userId: string;
}

class RegisterStore {
  userNameFieldIsSuccess: boolean = false;
  userSurnameFieldIsSuccess: boolean = false;
  userDepartmentIsSucess: boolean = false;
  userRepeatPasswordIsSuccess: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  validateUserNameField = (value: string): string => {
    if (value.length <= 2) {
      this.userNameFieldIsSuccess = false;
      return "Имя должно быть не менее 2 символов";
    }

    this.userNameFieldIsSuccess = true;
    return "";
  };

  validateUserSurnameField = (value: string): string => {
    if (value.length <= 2) {
      this.userSurnameFieldIsSuccess = false;
      return "Фамилия должна быть не менее 2 символов";
    }

    this.userSurnameFieldIsSuccess = true;
    return "";
  };

  validateUserDepartmentField = (value: string): string => {
    if (value.length <= 1) {
      this.userDepartmentIsSucess = false;
      return "Название автошколы должно быть не менее 1 символа";
    }

    this.userDepartmentIsSucess = true;
    return "";
  };

  validateUserRepeatPassword = (value: string): string => {
    if (value !== authStore.userPassword) {
      this.userRepeatPasswordIsSuccess = false;
      if (authStore.userPassword.length === 0)
        return "Пароль ещё не ведённый в другом поле ввода";
      return "Пароли не совпадают!";
    }

    this.userRepeatPasswordIsSuccess = true;
    return "";
  };

  async register(credentials: IRegisterCredentials) {
    authStore.setIsLoading(true);
    notificationStore.deleteNotification();

    try {
      const { data }: AxiosResponse<IRegisterResponse> = await axios.post(
        "api/auth/register",
        credentials
      );

      authStore.login(
        {
          firstName: data.firstName,
          secondName: data.secondName,
          email: data.email,
        },
        data.token
      );
    } catch (error) {
      errorHandling(error);
    } finally {
      authStore.setIsLoading(false);
    }
  }
}

const registerStore = new RegisterStore();
export default registerStore;
