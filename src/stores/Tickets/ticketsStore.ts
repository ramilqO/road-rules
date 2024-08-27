import axios from "axios";
import type { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";

import { storageSelectors } from "../storageSelectors";
import getLocalStorage from "../../tools/getLocalStorageData";

import errorHandling from "../../tools/errorHandling";
import authStore from "../Auth/authStore";
import tokenServices from "../tokenServices";

interface IQuestion {
  question: string;
  ticketId: string;
  questionId: string;
  img: string;
  answers: {
    answerText: string;
    answerId: string;
  }[];
}

interface ILocalStorageCurrentTicketId {
  ticketId: string;
}

const localStorageQuestions = getLocalStorage<IQuestion[]>(
  storageSelectors.questions
);

const localStorageCurrentTicketId =
  getLocalStorage<ILocalStorageCurrentTicketId>(
    storageSelectors.currentTicketId
  );

class TicketsStore {
  tickets: string[];
  currentTicketId: string;
  questions: IQuestion[];

  constructor() {
    this.questions = localStorageQuestions ? localStorageQuestions : [];
    this.tickets = [];
    this.currentTicketId = localStorageCurrentTicketId
      ? localStorageCurrentTicketId.ticketId
      : "";

    makeAutoObservable(this);
  }

  setTickets(tickets: string[]) {
    this.tickets = tickets;
  }

  setQuestions(questions: IQuestion[], ticketId?: string) {
    this.questions = questions;
    this.currentTicketId = ticketId || "";

    localStorage.setItem(storageSelectors.questions, JSON.stringify(questions));
    localStorage.setItem(storageSelectors.currentTicketId, ticketId || "");
  }

  async fetchData(callback: () => Promise<void>) {
    authStore.setIsLoading(true);
    const persistedToken = authStore.userInfo?.token;

    if (!persistedToken) {
      errorHandling(
        "Ошибка при получении данных. Отсутствует токен.",
        "Билетов"
      );
      return;
    }
    tokenServices.set(persistedToken);

    try {
      await callback();
    } catch (error) {
      errorHandling(error, "Билетов");
    } finally {
      authStore.setIsLoading(false);
    }
  }

  async getListTickets() {
    await this.fetchData(async () => {
      const { data } = await axios.get("api/tickets");
      this.setTickets(data);
    });
  }

  async getTicketQuestions(ticketId: string) {
    await this.fetchData(async () => {
      const { data }: AxiosResponse<IQuestion[]> = await axios.get(
        `api/tickets/${ticketId}`
      );
      this.setQuestions(data, ticketId);
    });
  }
}

const ticketsStore = new TicketsStore();
export default ticketsStore;
