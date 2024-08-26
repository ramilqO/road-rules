import { makeAutoObservable } from "mobx";
import axios, { AxiosResponse } from "axios";

import authStore from "../Auth/authStore";
import errorHandling from "../../tools/errorHandling";
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

class TicketsStore {
  tickets: string[];
  questions: IQuestion[];

  constructor() {
    this.tickets = [];
    this.questions = [];
    makeAutoObservable(this);
  }

  setTickets(tickets: string[]) {
    this.tickets = tickets;
  }

  setQuestions(questions: IQuestion[]) {
    this.questions = questions;
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
      this.setQuestions(data);
      console.log(data)
    });
  }
}

const ticketsStore = new TicketsStore();
export default ticketsStore;
