import ticketsStore from "@/stores/Tickets/ticketsStore";
import style from "./QuestionNavigationList.module.scss";

import ArrowLeftIcon from "/public/svg/question/ArrowLeftIcon";
import ArrowRightIcon from "/public/svg/question/ArrowRightIcon";

interface IQuestionNavigationList {
  indexQuestion: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  action: (newIndex: number) => void;
  findNextQuestionWithoutAnswer: (currentIndex: number) => number;
}

const QuestionNavigationList = ({
  indexQuestion,
  isFirstQuestion,
  isLastQuestion,
  action,
  findNextQuestionWithoutAnswer,
}: IQuestionNavigationList) => {
  const findPreviousQuestionWithoutAnswer = (currentIndex: number) => {
    for (let i = currentIndex - 1; i >= 0; i -= 1) {
      const question = ticketsStore.questions[i];
      const answerExists = ticketsStore.answers.some(
        (answer) => answer.questionId === question.questionId
      );
      if (!answerExists) {
        return i;
      }
    }
    return currentIndex;
  };

  return (
    <ul className={style.navigationList}>
      <li>
        <button
          className={style.navigationList_button}
          disabled={isFirstQuestion}
          onClick={() => {
            const indexPreviousQuestion =
              findPreviousQuestionWithoutAnswer(indexQuestion);
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
          disabled={isLastQuestion}
          onClick={() => {
            const indexNextQuestion =
              findNextQuestionWithoutAnswer(indexQuestion);
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
