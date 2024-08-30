import { makeAutoObservable } from "mobx";
import api from "../Any/requestsOperations";

interface IExam {
  img: string;
  question: string;
  ticketId: string;
  questionId: string;
  answers: {
    answerText: string;
    answerId: string;
  }[];
}

class ExamStore {
  exam: IExam[];

  constructor() {
    this.exam = [];
    makeAutoObservable(this);
  }

  async getExam() {
    const responseExam = await api.getExam();
    if (!responseExam) return;
    this.exam = responseExam;
  }
}

const examStore = new ExamStore();
export default examStore;
