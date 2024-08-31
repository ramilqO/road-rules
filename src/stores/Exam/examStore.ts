import { makeAutoObservable } from "mobx";
import api from "../Request/requestsOperations";

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

  setExam(exam: IExam[]) {
    this.exam = exam;
  }

  async getExam() {
    const responseExam = await api.getExam();
    if (!responseExam) return;
    // TODO --> если тут изменять на прямую всё равно предупреждение
    this.setExam(responseExam);
  }
}

const examStore = new ExamStore();
export default examStore;
