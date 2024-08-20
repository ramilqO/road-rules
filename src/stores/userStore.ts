import { makeAutoObservable } from 'mobx';

interface IUserStore {
  firstName: string;
  secondName: string;
  isAuth: boolean;
}
//TODO: authStore уже хранит в себе всю эту инфомрмацию, нет смысла делать еще один такой же стор с теми е полями
class UserStore implements IUserStore {
  firstName = '';
  secondName = '';
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }
}

const userStore = new UserStore();
export default userStore;
