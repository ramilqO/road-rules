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
  constructor() {
    makeAutoObservable(this);
  }

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
