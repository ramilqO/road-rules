import React from "react";

import style from "./QuestionNavigationList.module.scss";

import ArrowLeftIcon from "/public/svg/question/ArrowLeftIcon";
import ArrowRightIcon from "/public/svg/question/ArrowRightIcon";

interface IQuestionNavigationList {
  indexQuestion: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  action: (newIndex: number) => void;
}

const QuestionNavigationList: React.FC<IQuestionNavigationList> = ({
  indexQuestion,
  isFirstQuestion,
  isLastQuestion,
  action,
}) => {
  return (
    <ul className={style.navigationList}>
      <li>
        <button
          className={style.navigationList_button}
          disabled={isFirstQuestion}
          onClick={() => action(indexQuestion - 1)}
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
          onClick={() => action(indexQuestion + 1)}
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
