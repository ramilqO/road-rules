import axios from "axios";
import type { AxiosResponse } from "axios";

import {
  token,
  checkInternetConnection,
  errorHandling,
} from "./requestsOperations";

import authStore from "../Auth/authStore";
import notificationStore from "../Notification/notificationStore";

interface ICredentialsLogin {
  email: string;
  password: string;
}

interface IResponseLogin {
  firstName: string;
  secondName: string;
  isAppointExam: boolean;
  token: string;
}

interface ICredentialsRegister {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  department: string;
}

interface IResponseRegister {
  firstName: string;
  secondName: string;
  token: string;
  email: string;
  userId: string;
}

const authOperations = {
  async login(credentials: ICredentialsLogin): Promise<IResponseLogin | null> {
    notificationStore.deleteNotification();
    try {
      const hasInternet = checkInternetConnection("логина");
      if (!hasInternet) return null;

      authStore.setIsLoading(true);

      const { data }: AxiosResponse<IResponseLogin> = await axios.post(
        "/api/auth/login",
        credentials
      );
      token.set(data.token);
      return data;
    } catch (error) {
      errorHandling(error, "логина");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },

  async register(
    credentials: ICredentialsRegister
  ): Promise<IResponseRegister | null> {
    notificationStore.deleteNotification();
    try {
      const hasInternet = checkInternetConnection("регистрации");
      if (!hasInternet) return null;

      authStore.setIsLoading(true);

      const { data }: AxiosResponse<IResponseRegister> = await axios.post(
        "/api/auth/register",
        credentials
      );
      token.set(data.token);
      return data;
    } catch (error) {
      errorHandling(error, "регистрации");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },

  logout() {
    token.unset();
  },
};

export default authOperations;
