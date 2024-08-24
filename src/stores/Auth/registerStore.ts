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
  emailFieldIsSuccess: boolean;
  nameFieldIsSuccess: boolean;
  surnameFieldIsSuccess: boolean;
  userPassword: string = "";
  passwordFieldIsSuccess: boolean;
  repeatPasswordFieldIsSuccess: boolean;
  departmentFieldIsSuccess: boolean;

  constructor() {
    this.emailFieldIsSuccess = false;
    this.nameFieldIsSuccess = false;
    this.surnameFieldIsSuccess = false;
    this.userPassword = "";
    this.passwordFieldIsSuccess = false;
    this.repeatPasswordFieldIsSuccess = false;
    this.departmentFieldIsSuccess = false;

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
      if (!value.includes("@")) return "Почта должна содержать @";
      if (atIndex !== -1 && atIndex === value.length - 1)
        return "После символа @ должно содержаться доменное имя";
      if (!/\.[a-zA-Z]{2,}$/.test(domainPart))
        return "Доменное имя должно заканчиваться на .com, .ru или другой допустимый домен";
      return "Введите корректный адрес электронной почты";
    }

    this.emailFieldIsSuccess = true;
    return "";
  };

  validateNameField = (value: string): string => {
    if (value.length < 2) {
      this.nameFieldIsSuccess = false;
      return "Имя должно быть не менее 2 символов";
    }

    this.nameFieldIsSuccess = true;
    return "";
  };

  validateSurnameField = (value: string): string => {
    if (value.length < 2) {
      this.surnameFieldIsSuccess = false;
      return "Фамилия должна быть не менее 2 символов";
    }

    this.surnameFieldIsSuccess = true;
    return "";
  };

  validatePasswordField = (value: string): string => {
    this.userPassword = value;

    if (value.length < 6) {
      this.passwordFieldIsSuccess = false;
      return "Пароль должен быть не меньше 6 символов";
    }

    this.passwordFieldIsSuccess = true;
    return "";
  };

  securityPasswordField = (
    value: string
  ): { steps: number; message: string } => {
    let steps = 0;
    let message = "";

    if (value.length >= 6) {
      steps = 1;
      message = "Не надежный";
    }
    if (value.length >= 8 || /[A-Z;А-Я]/.test(value)) {
      steps = 2;
      message = "Надёжный";
    }
    if (value.length >= 8 && /[A-Z;А-Я]/.test(value)) {
      steps = 3;
      message = "Надёжный";
    }
    if (
      value.length >= 8 &&
      /[A-Z;А-Я]/.test(value) &&
      /[0-9]/.test(value) &&
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)
    ) {
      steps = 4;
      message = "Безопасный";
    }

    return { steps, message };
  };

  validateRepeatPassword = (value: string): string => {
    if (value !== this.userPassword) {
      this.repeatPasswordFieldIsSuccess = false;
      return this.userPassword.length === 0
        ? "Пароль ещё не введён в другом поле ввода"
        : "Пароли не совпадают!";
    }

    this.repeatPasswordFieldIsSuccess = true;
    return "";
  };

  validateDepartmentField = (value: string): string => {
    if (value.length <= 1) {
      this.departmentFieldIsSuccess = false;
      return "Название департамента должно быть не менее 1 символа";
    }

    this.departmentFieldIsSuccess = true;
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
      errorHandling(error, "Регистрация");
    } finally {
      authStore.setIsLoading(false);
    }
  }
}

const registerStore = new RegisterStore();
export default registerStore;
