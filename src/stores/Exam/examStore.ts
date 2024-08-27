import { makeAutoObservable } from "mobx";
import axios from "axios";

import authStore from "../Auth/authStore";
import tokenServices from "../tokenServices";
import errorHandling from "../../tools/errorHandling";

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
    authStore.setIsLoading(true);
    const persistedToken = authStore.userInfo?.token;

    if (!persistedToken) {
      errorHandling(
        "Ошибка при получение Экзамена. Отсутствует токен.",
        "Экзамена"
      );
      return;
    }

    tokenServices.set(persistedToken);

    try {
      const { data } = await axios.get("api/exam");
      this.setExam(data);
    } catch (error) {
      errorHandling(error, "Экзамена");
    } finally {
      authStore.setIsLoading(false);
    }
  }
}

const examStore = new ExamStore();
export default examStore;
