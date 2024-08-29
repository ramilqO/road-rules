import { makeAutoObservable } from "mobx";

import storageSelectors from "../Any/storageSelectors";
import getLocalStorage from "../../tools/Helpers/getLocalStorageData";

import api from "../Any/requestsOperations";

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

const localStorageQuestions = getLocalStorage<IQuestion[]>(
  storageSelectors.questions
);
const localStorageCurrentTicketId = getLocalStorage(
  storageSelectors.currentTicketId
);

class TicketsStore {
  tickets: string[];
  currentTicketId: string;
  questions: IQuestion[];

  constructor() {
    this.tickets = [];
    this.questions = localStorageQuestions || [];
    this.currentTicketId = localStorageCurrentTicketId
      ? String(localStorageCurrentTicketId)
      : "";

    makeAutoObservable(this);
  }

  setTickets(tickets: string[]) {
    this.tickets = tickets;
  }

  setQuestions(questions: IQuestion[], ticketId?: string) {
    this.currentTicketId = ticketId || "";
    this.questions = questions;

    localStorage.setItem(storageSelectors.questions, JSON.stringify(questions));
    localStorage.setItem(storageSelectors.currentTicketId, ticketId || "");
  }

  async getListTickets() {
    const listTicketsResponse = await api.getListTickets();
    if (listTicketsResponse) {
      this.setTickets(listTicketsResponse);
    }
  }

  async getTicketQuestions(ticketId: string) {
    const ticketQuestionsResponse = await api.getTicketQuestions(ticketId);
    if (ticketQuestionsResponse) {
      this.setQuestions(ticketQuestionsResponse, ticketId);
    }
  }
}

const ticketsStore = new TicketsStore();
export default ticketsStore;
