import { makeAutoObservable } from "mobx";
import axios, { AxiosResponse } from "axios";
import { AuthStore } from "./authStore";
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
  private authStore: AuthStore;

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  async login(credentials: ILoginCredentials) {
    this.authStore.isLoading = true;
    notificationStore.setBodyText("");

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
      console.log(this.authStore.data.firstName)
    } catch (error) {
      errorHandling(error);
    } finally {
      this.authStore.isLoading = false;
    }
  }
}

const authStore = new AuthStore();
const loginStore = new LoginStore(authStore);
export default loginStore;
