import { makeAutoObservable } from "mobx";
import axios, { AxiosResponse } from "axios";

import { AuthStore } from "./authStore";

interface IResponse {
  firstName: string;
  secondName: string;
  token: string;
}

interface ICredentials {
  email: string;
  password: string;
}

interface ILoginCredentials extends ICredentials {}

interface IRegisterCredentials extends ICredentials {
  firstName: string;
  secondName: string;
  department: string;
}

interface ILoginResponse extends IResponse {
  isAppointExam: boolean;
}

interface IRegisterResponse extends IResponse {
  email: string;
  userId: string;
}

class AuthOperations {
  private authStore: AuthStore;

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  async login(credentials: ILoginCredentials) {
    this.authStore.isLoading = true;
    this.authStore.error = { message: "" };

    try {
      const response: AxiosResponse<ILoginResponse> = await axios.post(
        "api/auth/login",
        credentials
      );

      const data = response.data;

      console.log(data);

      this.authStore.setToken(data.token);
      this.authStore.data = {
        firstName: data.firstName,
        secondName: data.secondName,
        email: credentials.email,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.authStore.error = { message: error.message };
      } else {
        this.authStore.error = {
          message: "Неизвестная ошибка. Попробуйте заново",
        };
      }
    } finally {
      this.authStore.isLoading = false;
    }
  }

  async register(credentials: IRegisterCredentials) {
    this.authStore.isLoading = true;
    this.authStore.error = { message: "" };

    try {
      const response: AxiosResponse<IRegisterResponse> = await axios.post(
        "api/auth/register",
        credentials
      );

      const data = response.data;

      console.log(data);

      this.authStore.setToken(data.token);
      this.authStore.data = {
        firstName: data.firstName,
        secondName: data.secondName,
        email: data.email,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.authStore.error = { message: error.message };
      } else {
        this.authStore.error = {
          message: "Неизвестная ошибка. Попробуйте заново",
        };
      }
    } finally {
      this.authStore.isLoading = false;
    }
  }

  logout() {
    // оказывается у нас нету logout запроса, но я нахалтурил :)

    this.authStore.unset();
    this.authStore.data = {
      firstName: "",
      secondName: "",
      email: "",
    };
  }
}

const authStore = new AuthStore();
const authOperations = new AuthOperations(authStore);
export default authOperations;
