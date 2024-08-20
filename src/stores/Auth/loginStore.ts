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
  constructor() {
    makeAutoObservable(this);
  }

  async login(credentials: ILoginCredentials) {
    authStore.setIsLoading(true);
    authStore.setIsAuth(false);
    notificationStore.deleteNotification();

    try {
      const response: AxiosResponse<ILoginResponse> = await axios.post(
        "api/auth/login",
        credentials,
      );

      const data = response.data;

      //TODO: вот этот код у тебя один и тот же в регистрации и в регистрации, сделай метод login в authStore и вызывай его вместо того что бы здесь управлять отдельными данными
      authStore.setToken(data.token);
      authStore.setIsAuth(true);
      authStore.setData({
        firstName: data.firstName,
        secondName: data.secondName,
        email: credentials.email,
      });
    } catch (error) {
      errorHandling(error);
    } finally {
      authStore.setIsLoading(false);
    }
  }
}

const loginStore = new LoginStore();
export default loginStore;
