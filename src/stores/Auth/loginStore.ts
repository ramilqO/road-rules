import { makeAutoObservable } from "mobx";
import AuthStore from "./authStore";
import axios from "axios";

interface IResponse {
  firstName: string;
  secondName: string;
  isAppointExam: boolean;
  token: string;
}

interface ICredentials {
  email: string;
  password: string;
}

class LoginStore extends AuthStore {
  constructor() {
    super();
    makeAutoObservable(this);
  }

  async login(credentials: ICredentials) {
    this.isLoading = true;
    this.error = { message: "" };

    try {
      const response = (await axios.post(
        "api/auth/login",
        credentials
      )) as IResponse;

      this.setToken(response.token);
      this.data = {
        firstName: response.firstName,
        secondName: response.secondName,
        email: credentials.email,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.error = { message: error.message };
      } else {
        this.error = { message: "Неизвестная ошибка. Попробуйте заново" };
      }
    } finally {
      this.isLoading = false;
    }
  }
}

const loginStore = new LoginStore();
export default loginStore;
