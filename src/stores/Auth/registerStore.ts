import { makeAutoObservable } from "mobx";
import AuthStore from "./authStore";
import axios from "axios";

interface IResponse {
  email: string;
  firstName: string;
  secondName: string;
  userId: string;
  token: string;
}

interface ICredentials {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  department: string;
}

class RegisterStore extends AuthStore {
  constructor() {
    super();
    makeAutoObservable(this);
  }

  async register(credentials: ICredentials) {
    this.isLoading = false;
    this.error = { message: "" };

    try {
      const response = (await axios.post(
        "api/auth/register",
        credentials
      )) as IResponse;
      this.setToken(response.token);
      this.data = {
        firstName: response.firstName,
        secondName: response.secondName,
        email: response.email,
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

const registerStore = new RegisterStore();
export default registerStore;
