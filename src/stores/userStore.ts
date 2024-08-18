import { makeAutoObservable } from "mobx";

interface IUserStore {
  firstName: string;
  secondName: string;
  isAuth: boolean;
}

class UserStore implements IUserStore {
  firstName = "";
  secondName = "";
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }
}

const userStore = new UserStore();
export default userStore;
