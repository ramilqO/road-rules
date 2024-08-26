import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import style from "./Questions.module.scss";

import Question from "./Question/Question";
import Loader from "../../Ui/Loader/Loader";

import authStore from "../../stores/Auth/authStore";
import ticketsStore from "../../stores/Tickets/ticketsStore";

const Questions = observer(() => {
  const { ticketId } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const questionsToRender = ticketsStore.questions.slice(0, -1);

  useEffect(() => {
    ticketsStore.getTicketQuestions(String(ticketId));
  }, []);

  if (authStore.isLoading) return <Loader loaderStyle="huge" />;

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
