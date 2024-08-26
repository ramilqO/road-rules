import { observer } from "mobx-react-lite";
import { useState } from "react";

import ticketsStore from "../../stores/Tickets/ticketsStore";
import Question from "./Question/Question";
import style from "./Questions.module.scss";

const Questions = observer(() => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  // TODO: вот это я не совем понял, зачем ты делаешь копию массива?
  const questionsToRender = ticketsStore.questions.slice(0, -1);

  return (
    <div className={style.questions}>
      <div className={style.questions__paginationWrapper}>
        <ul className={style.questions__listPagination}>
          {questionsToRender.map((question, i) => (
            <li
              className={style.listPagination__item}
              key={question.questionId}
            >
              {/* TODO: у тебя есть компонент кнопки, не нужно заново их рисовать */}
              <button
                className={`${style.listPagination__button} ${
                  currentQuestion === i + 1 &&
                  style["listPagination__button--current"]
                }`}
                onClick={() => setCurrentQuestion(i + 1)}
                type="button"
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Question
        indexQuestion={currentQuestion}
        action={(newCurrentQuestionIndex: number) =>
          setCurrentQuestion(newCurrentQuestionIndex)
        }
      />
    </div>
  );
});

export default Questions;
