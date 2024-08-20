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
  // TODO: посмотри как я переписал authStore он стал чище, но при этом так же работает, тебе не нужно приватное поле, которое ты потом вызываешь через this. можно сразу писать authStore.login() это выглядит чище и читаеться легче
  private authStore: typeof authStore;

  constructor() {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  async register(credentials: IRegisterCredentials) {
    this.authStore.setIsLoading(true);
    // TODO: нет смысла делать setIsAuth в то время как ты пытаешься зарегестрироваться, у тебя будет кнопка выйти из аккаунта которая это сделает, а после нее уже появляются кнопки для регистрации
    this.authStore.setIsAuth(false);
    notificationStore.deleteNotification();

    try {
      const response: AxiosResponse<IRegisterResponse> = await axios.post(
        "api/auth/register",
        credentials,
      );

      const data = response.data;

      //TODO: вот этот код у тебя один и тот же в логине и в регистрации, сделай метод login в authStore и вызывай его вместо того что бы здесь управлять отдельными данными
      this.authStore.setToken(data.token);
      this.authStore.setIsAuth(true);
      this.authStore.data = {
        firstName: data.firstName,
        secondName: data.secondName,
        email: data.email,
      };
    } catch (error) {
      errorHandling(error);
    } finally {
      this.authStore.setIsLoading(false);
    }
  }
}

const registerStore = new RegisterStore();
export default registerStore;
