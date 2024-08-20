import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import tokenServices from '../tokenServices';

axios.defaults.baseURL = 'http://road-rules-backend.webtm.ru/';

// TODO: имя переменной и тип data ни о чем не говорят, не яно что именно тут лежит, назови это как userInfo так будет более ясно что это за объект
interface IData {
  firstName: string;
  secondName: string;
  email: string;
}

interface IAuth {
  data: IData;
  isLoading: boolean;
  isAuth: boolean;
}

export class AuthStore implements IAuth {
  data = {
    firstName: '',
    secondName: '',
    email: '',
  };
  isLoading = false;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    tokenServices.set(token);
  }

  //TODO: какой смысл от этого метода, если ты его вызываешь только в этом классе? Ты можешь в logout сделать tokenServices.unset(), ты этим методом усложнил чтение
  unset() {
    tokenServices.unset();
  }

  // TODO: тоже не ясно что за метод, какую дату он устанавливает, если его назвать setUserInfo будет более ясно, аргумент тоже назови правильно
  setData(data: IData) {
    this.data = data;
  }

  // TODO: видишь здесь же ты красиво назвал аргумент и метод
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  login() {
    //TODO: вот здесь должны производиться все действия для логина когда данные получены
  }

  logout() {
    this.unset();
    this.data = {
      firstName: '',
      secondName: '',
      email: '',
    };
    this.isAuth = false;
  }
}

const authStore = new AuthStore();
export default authStore;
