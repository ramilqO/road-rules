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
  emailFieldSuccess: boolean = false;

  handleValidateEmailField = (value: string): string => {
    if (value.length < 10) {
      this.emailFieldSuccess = false;
      return "Email должен содержать не менее 10 символов.";
    }
    this.emailFieldSuccess = true;
    return "";
  }

  constructor() {
    makeAutoObservable(this);
  }

  async login(credentials: ILoginCredentials) {
    authStore.setIsLoading(true);
    authStore.setIsAuth(false);
    notificationStore.deleteNotification();

    try {
      const { data }: AxiosResponse<ILoginResponse> = await axios.post(
        "api/auth/login",
        credentials
      );

      authStore.login(
        {
          firstName: data.firstName,
          secondName: data.secondName,
          email: credentials.email,
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

const loginStore = new LoginStore();
export default loginStore;
