import style from "./QuestionNavigationList.module.scss";

import ArrowLeftIcon from "/public/svg/question/ArrowLeftIcon";
import ArrowRightIcon from "/public/svg/question/ArrowRightIcon";

interface IQuestionNavigationList {
  indexQuestion: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  action: (newIndex: number) => void;
  getNextQuestionWithoutAnswer: (currentIndex: number) => number;
  getPreviousQuestionWithoutAnswer: (currentIndex: number) => number;
}

const QuestionNavigationList = ({
  indexQuestion,
  isFirstQuestion,
  isLastQuestion,
  action,
  getNextQuestionWithoutAnswer,
  getPreviousQuestionWithoutAnswer,
}: IQuestionNavigationList) => {
  return (
    <ul className={style.navigationList}>
      <li>
        <button
          className={style.navigationList_button}
          disabled={isFirstQuestion}
          onClick={() => {
            const indexPreviousQuestion =
              getNextQuestionWithoutAnswer(indexQuestion);
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
              getPreviousQuestionWithoutAnswer(indexQuestion);
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
