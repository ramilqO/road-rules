import axios from "axios";
import type { AxiosResponse } from "axios";

import {
  checkInternetConnection,
  checkToken,
  errorHandling,
} from "./requestsOperations";

import authStore from "../Auth/authStore";

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

const examOperations = {
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

export default examOperations;
