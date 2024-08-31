import axios from "axios";
import type { AxiosResponse } from "axios";

import authStore from "../Auth/authStore";
import notificationStore from "../Notification/notificationStore";

interface ICredentialsLogin {
  email: string;
  password: string;
}

interface IResponseLogin {
  firstName: string;
  secondName: string;
  isAppointExam: boolean;
  token: string;
}

interface ICredentialsRegister {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  department: string;
}

interface IResponseRegister {
  firstName: string;
  secondName: string;
  token: string;
  email: string;
  userId: string;
}

interface IResponseQuestion {
  question: string;
  ticketId: string;
  questionId: string;
  img: string;
  answers: {
    answerText: string;
    answerId: string;
  }[];
}

interface IResponseExam {
  img: string;
  question: string;
  ticketId: string;
  questionId: string;
  answers: {
    answerText: string;
    answerId: string;
  }[];
}

interface ICredentialsTicketAnswer {
  ticketId: string;
  questionId: string;
  answerId: string;
}

interface IResponseTicketAnswer {
  isCorrect: boolean;
  correctAnswer: string;
  help: string;
}

interface IRetureDataTicketAnswer extends IResponseTicketAnswer {
  ourAnswer: string;
}

axios.defaults.baseURL = "http://road-rules-backend.webtm.ru";

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = undefined;
  },
};

function errorHandling(error: unknown, titleText?: string) {
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

function checkInternetConnection(titleText: string) {
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

function checkToken(titleText: string) {
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
  async login(credentials: ICredentialsLogin): Promise<IResponseLogin | null> {
    notificationStore.deleteNotification();
    try {
      const hasInternet = checkInternetConnection("логина");
      if (!hasInternet) return null;

      authStore.setIsLoading(true);

      const { data }: AxiosResponse<IResponseLogin> = await axios.post(
        "/api/auth/login",
        credentials
      );
      token.set(data.token);
      return data;
    } catch (error) {
      errorHandling(error, "логина");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },

  async register(
    credentials: ICredentialsRegister
  ): Promise<IResponseRegister | null> {
    notificationStore.deleteNotification();

    try {
      const hasInternet = checkInternetConnection("регистрации");
      if (!hasInternet) return null;

      authStore.setIsLoading(true);

      const { data }: AxiosResponse<IResponseRegister> = await axios.post(
        "/api/auth/register",
        credentials
      );
      token.set(data.token);
      return data;
    } catch (error) {
      errorHandling(error, "регистрации");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },

  logout() {
    token.unset;
  },

  async getListTickets(): Promise<string[] | null> {
    notificationStore.deleteNotification();

    try {
      const hasInternet = checkInternetConnection("получения билета");
      const hasToken = checkToken("получения билета");
      authStore.setIsLoading(true);
      if (!hasInternet || !hasToken) return null;

      const { data }: AxiosResponse<string[]> = await axios.get("/api/tickets");
      return data;
    } catch (error) {
      errorHandling(error, "получения билетов");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },

  async getTicketQuestions(
    ticketId: string
  ): Promise<IResponseQuestion[] | null> {
    notificationStore.deleteNotification();

    try {
      const hasInternet = checkInternetConnection("получения билета");
      const hasToken = checkToken("получения билета");
      authStore.setIsLoading(true);
      if (!hasInternet || !hasToken) return null;

      const { data }: AxiosResponse<IResponseQuestion[]> = await axios.get(
        `/api/tickets/${ticketId}`
      );
      return data;
    } catch (error) {
      errorHandling(error, "получения билета");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },

  async sendingAnswerFromTicket(
    credentials: ICredentialsTicketAnswer
  ): Promise<IRetureDataTicketAnswer | null> {
    try {
      const hasInternet = checkInternetConnection("отправки билета");
      const hasToken = checkToken("отправки билета");
      authStore.setIsLoading(true);
      if (!hasInternet || !hasToken) return null;

      const { data }: AxiosResponse<IResponseTicketAnswer> = await axios.post(
        "/api/tickets",
        credentials
      );
      const returnedData: IRetureDataTicketAnswer = {
        ourAnswer: credentials.answerId,
        ...data,
      };
      return returnedData;
    } catch (error) {
      errorHandling(error, "отправки билета");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },

  async getExam(): Promise<IResponseExam[] | null> {
    try {
      const hasInternet = checkInternetConnection("получения экзамена");
      const hasToken = checkToken("получения экзамена");
      authStore.setIsLoading(true);
      if (!hasInternet || !hasToken) return null;

      const { data }: AxiosResponse<IResponseExam[]> = await axios.get(
        "/api/exam"
      );
      return data;
    } catch (error) {
      errorHandling(error, "получения экзамена");
      return null;
    } finally {
      authStore.setIsLoading(false);
    }
  },
};

export default api;
