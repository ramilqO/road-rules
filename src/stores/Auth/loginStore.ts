import { makeAutoObservable } from "mobx";
import axios, { AxiosResponse } from "axios";

import authStore from "./authStore";
import errorHandling from "../../tools/errorHandling";
import notificationStore from "../notificationStore";

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
  private authStore: typeof authStore;

  constructor() {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  async login(credentials: ILoginCredentials) {
    this.authStore.setIsLoading(true);
    this.authStore.setIsAuth(false);
    notificationStore.deleteNotification();

    try {
      const response: AxiosResponse<ILoginResponse> = await axios.post(
        "api/auth/login",
        credentials
      );

      const data = response.data;

      this.authStore.setToken(data.token);
      this.authStore.setIsAuth(true);
      this.authStore.setData({
        firstName: data.firstName,
        secondName: data.secondName,
        email: credentials.email,
      });
    } catch (error) {
      errorHandling(error);
    } finally {
      this.authStore.setIsLoading(false);
    }
  }
}

const loginStore = new LoginStore();
export default loginStore;
