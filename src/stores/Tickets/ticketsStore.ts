import { makeAutoObservable } from "mobx";

import storageSelectors from "../Selectors/storageSelectors";
import helpers from "@/tools/Helpers/helpers";

import api from "../Request/requestsOperations";

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

interface ICredentialsTicketAnswer {
  ticketId: string;
  questionId: string;
  answerId: string;
}

interface IAnswers {
  ourAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  help: string;
  questionId: string;
}
[];

const localStorageQuestions = helpers.getLocalStorage<IQuestion[]>(
  storageSelectors.questions
);
const localStorageCurrentTicketId = helpers.getLocalStorage(
  storageSelectors.currentTicketId
);

const localStorageAnswers = helpers.getLocalStorage<IAnswers[]>(
  storageSelectors.answers
);

class TicketsStore {
  tickets: string[];
  currentTicketId: string;
  questions: IQuestion[];
  answers: IAnswers[];

  constructor() {
    this.tickets = [];
    this.questions = localStorageQuestions || [];
    this.currentTicketId = localStorageCurrentTicketId
      ? String(localStorageCurrentTicketId)
      : "";
    this.answers = localStorageAnswers || [];

    makeAutoObservable(this);
  }

  setTickets(tickets: string[]) {
    this.tickets = tickets;
  }

  setAnswers(answer: IAnswers) {
    this.answers = [...this.answers, answer];
    localStorage.setItem(
      storageSelectors.answers,
      JSON.stringify(this.answers)
    );
  }

  resetAnswers() {
    localStorage.removeItem(storageSelectors.answers)
    this.answers = [];
  }

  setQuestions(questions: IQuestion[], ticketId?: string) {
    this.currentTicketId = ticketId || "";
    this.questions = questions;

    localStorage.setItem(storageSelectors.questions, JSON.stringify(questions));
    localStorage.setItem(storageSelectors.currentTicketId, ticketId || "");
  }

  async getListTickets() {
    const listTicketsResponse = await api.getListTickets();
    if (!listTicketsResponse) {
      localStorage.removeItem(storageSelectors.currentTicketId);
      return "";
    }
    this.setTickets(listTicketsResponse);
  }

  async getTicketQuestions(ticketId: string) {
    const ticketQuestionsResponse = await api.getTicketQuestions(ticketId);
    if (!ticketQuestionsResponse) return;
    this.setQuestions(ticketQuestionsResponse, ticketId);
  }

  async sendingAnswer(credentials: ICredentialsTicketAnswer) {
    const sendingAnswerResponse = await api.sendingAnswerFromTicket(
      credentials
    );
    if (!sendingAnswerResponse) return;
    this.setAnswers(sendingAnswerResponse);
  }
}

const ticketsStore = new TicketsStore();
export default ticketsStore;
