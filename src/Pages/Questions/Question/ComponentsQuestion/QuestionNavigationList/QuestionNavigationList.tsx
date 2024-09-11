import ticketsStore from "@/stores/Tickets/ticketsStore";
import style from "./QuestionNavigationList.module.scss";

import ArrowLeftIcon from "/public/svg/question/ArrowLeftIcon";
import ArrowRightIcon from "/public/svg/question/ArrowRightIcon";

interface IQuestionNavigationList {
  indexQuestion: number;
  action: (newIndex: number) => void;
}

const QuestionNavigationList = ({
  indexQuestion,
  action,
}: IQuestionNavigationList) => {
  const getNextQuestionWithoutAnswer = (
    currentIndexQuestion: number
  ): number => {
    let nextIndex = currentIndexQuestion;
    for (
      let i = currentIndexQuestion + 1;
      i < ticketsStore.questions.length;
      i++
    ) {
      const question = ticketsStore.questions[i];
      const answerExists = ticketsStore.answers.some(
        (answer) => answer.questionId === question.questionId
      );
      if (!answerExists) {
        nextIndex = i;
        break;
      }
    }
    if (nextIndex === currentIndexQuestion) {
      for (let i = 0; i < currentIndexQuestion; i++) {
        const question = ticketsStore.questions[i];
        const answerExists = ticketsStore.answers.some(
          (answer) => answer.questionId === question.questionId
        );
        if (!answerExists) {
          nextIndex = i;
          break;
        }
      }
    }
    return nextIndex;
  };

  const getPreviousQuestionWithoutAnswer = (
    currentIndexQuestion: number
  ): number => {
    let prevIndex = currentIndexQuestion;
    for (let i = currentIndexQuestion - 1; i >= 0; i--) {
      const question = ticketsStore.questions[i];
      const answerExists = ticketsStore.answers.some(
        (answer) => answer.questionId === question.questionId
      );
      if (!answerExists) {
        prevIndex = i;
        break;
      }
    }
    if (prevIndex === currentIndexQuestion) {
      for (
        let i = ticketsStore.questions.length - 1;
        i > currentIndexQuestion;
        i--
      ) {
        const question = ticketsStore.questions[i];
        const answerExists = ticketsStore.answers.some(
          (answer) => answer.questionId === question.questionId
        );
        if (!answerExists) {
          prevIndex = i;
          break;
        }
      }
    }
    return prevIndex;
  };

  const hasNextQuestion = () => {
    return getNextQuestionWithoutAnswer(indexQuestion) !== indexQuestion;
  };

  const hasPreviousQuestion = () => {
    return getPreviousQuestionWithoutAnswer(indexQuestion) !== indexQuestion;
  };

  return (
    <ul className={style.navigationList}>
      <li>
        <button
          className={style.navigationList_button}
          disabled={!hasPreviousQuestion()}
          onClick={() => {
            const indexPreviousQuestion =
              getPreviousQuestionWithoutAnswer(indexQuestion);
            action(indexPreviousQuestion);
          }}
          type="button"
        >
          <span>
            <ArrowLeftIcon />
          </span>
          Предыдущий вопрос
        </button>
      </li>
      <li className={style.navigationList_item}>
        <button
          className={style.navigationList_button}
          disabled={!hasNextQuestion()}
          onClick={() => {
            const indexNextQuestion =
              getNextQuestionWithoutAnswer(indexQuestion);
            action(indexNextQuestion);
          }}
          type="button"
        >
          Следующий вопрос
          <ArrowRightIcon />
        </button>
      </li>
    </ul>
  );
};

export default QuestionNavigationList;
