import { observer } from "mobx-react-lite";
import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import style from "./Questions.module.scss";

const Question = lazy(() => import("./Question/Question"));
const Loader = lazy(() => import("../../Ui/Loader/Loader"));

import authStore from "../../stores/Auth/authStore";
import examStore from "../../stores/Exam/examStore";
import ticketsStore from "../../stores/Tickets/ticketsStore";

const Questions = observer(() => {
  const { ticketId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questionsToRender =
    ticketsStore.questions.length > 0 && ticketId
      ? ticketsStore.questions
      : examStore.exam;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionsToRender.length - 1;

  function handleButtonClick(index: number) {
    if (index >= 0 && index < questionsToRender.length) {
      setCurrentQuestionIndex(index);
    }
  }

  useEffect(() => {
    if (ticketId) {
      if (ticketId !== ticketsStore.currentTicketId) {
        ticketsStore.getTicketQuestions(String(ticketId));
      }
    } else if (!ticketId) {
      examStore.getExam();
    }
  }, [ticketId]);

  if (authStore.isLoading) return <Loader loaderStyle="huge" />;
  return (
    <div className={style.questions}>
      <div className={style.questions__paginationWrapper}>
        <ul className={style.questions__listPagination}>
          {questionsToRender.map((question, i) => (
            <li
              className={style.listPagination__item}
              key={`${question.questionId + i}`}
            >
              <button
                className={`${style.listPagination__button} ${
                  currentQuestionIndex === i
                    ? style["listPagination__button--current"]
                    : ""
                }`}
                onClick={() => handleButtonClick(i)}
                type="button"
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Question
        indexQuestion={currentQuestionIndex}
        action={handleButtonClick}
        currentQuestion={questionsToRender[currentQuestionIndex]}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
});

export default Questions;
