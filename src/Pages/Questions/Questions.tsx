import { useState } from "react";
import { observer } from "mobx-react-lite";

import style from "./Questions.module.scss";
import Question from "./Question/Question";
import ticketsStore from "../../stores/Tickets/ticketsStore";

const Questions = observer(() => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
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
              <button
                className={`${style.listPagination__button} ${
                  currentQuestion === i + 1 &&
                  style["listPagination__button--current"]
                }`}
                onClick={() => setCurrentQuestion(i + 1)}
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
