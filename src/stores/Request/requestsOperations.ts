import axios from "axios";

import authStore from "../Auth/authStore";
import notificationStore from "../Notification/notificationStore";

import authOperations from "./authOperations";
import ticketOperations from "./ticketOperations";
import examOperations from "./examOperations";

export interface IResponseTicketAnswer {
  isCorrect: boolean;
  correctAnswer: string;
  help: string;
}

axios.defaults.baseURL = "http://road-rules-backend.webtm.ru";

export const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = undefined;
  },
};

export const errorHandling = (error: unknown, titleText?: string) => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    notificationStore.setNotification({
      type: "error",
      titleText: `Ошибка ${titleText}`,
      bodyText: error.response?.data?.message,
    });
    return;
  }
  notificationStore.setNotification({
    type: "error",
    titleText: `Ошибка ${titleText}`,
    bodyText: "Неизвестная ошибка",
  });
}

export const checkInternetConnection = (titleText: string) => {
  const isOnline = navigator.onLine;
  if (!isOnline) {
    notificationStore.setNotification({
      type: "error",
      titleText: `Ошибка ${titleText}`,
      bodyText: "Отсуствует интернет подключение",
    });
  }

  return isOnline;
}

export const checkToken = (titleText: string) => {
  const tokenAuthorization = authStore.userInfo?.token;
  if (!tokenAuthorization) {
    notificationStore.setNotification({
      type: "error",
      titleText: `Ошибка ${titleText}`,
      bodyText: "Отсуствует токен",
    });
    authStore.setIsLoading(false);
    return;
  }
  token.set(tokenAuthorization);
  return token;
}

const api = {
  login: authOperations.login,
  register: authOperations.register,
  logout: authOperations.logout,

  getListTickets: ticketOperations.getListTickets,
  getTicketQuestions: ticketOperations.getTicketQuestions,
  sendingAnswerFromTicket: ticketOperations.sendingAnswerFromTicket,

  getExam: examOperations.getExam,
};

export default api;
