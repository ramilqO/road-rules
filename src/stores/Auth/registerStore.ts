import { makeAutoObservable } from "mobx";
import axios, { AxiosResponse } from "axios";

import { AuthStore } from "./authStore";
import errorHandling from "../../tools/errorHandling";
import notificationStore from "../notificationStore";

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
  private authStore: AuthStore;

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  async register(credentials: IRegisterCredentials) {
    this.authStore.isLoading = true;
    notificationStore.setBodyText("");

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
      errorHandling(error);
    } finally {
      this.authStore.isLoading = false;
    }
  }
}

const authStore = new AuthStore();
const registerStore = new RegisterStore(authStore);
export default registerStore;
