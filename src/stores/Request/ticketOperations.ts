import axios from "axios";
import type { AxiosResponse } from "axios";

import {
  checkInternetConnection,
  checkToken,
  errorHandling,
  IResponseTicketAnswer,
} from "./requestsOperations";

import authStore from "../Auth/authStore";
import notificationStore from "../Notification/notificationStore";

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

interface ICredentialsTicketAnswer {
  ticketId: string;
  questionId: string;
  answerId: string;
  indexQuestion: number;
}

interface IRetureDataTicketAnswer extends IResponseTicketAnswer {
  ourAnswer: string;
  indexQuestion: number;
}

const ticketOperations = {
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
        indexQuestion: credentials.indexQuestion,
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
};

export default ticketOperations;
