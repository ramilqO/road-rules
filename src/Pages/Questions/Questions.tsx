import { observer } from "mobx-react-lite";
import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import style from "./Questions.module.scss";

const Question = lazy(() => import("./Question/Question"));
const Loader = lazy(() => import("@/Ui/Loader/Loader"));

import authStore from "@/stores/Auth/authStore";
import examStore from "@/stores/Exam/examStore";
import ticketsStore from "@/stores/Tickets/ticketsStore";

import storageSelectors from "@/stores/Selectors/storageSelectors";
import helpers from "@/tools/Helpers/helpers";

const localStorageCurrentQuestionPage = helpers.getLocalStorage(
  storageSelectors.currentQuestionPage
);

const Questions = observer(() => {
  const { ticketId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const localData = Number(localStorageCurrentQuestionPage);
    return Number.isNaN(localData) ? 0 : localData;
  });

  const questionsToRender = ticketId ? ticketsStore.questions : examStore.exam;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionsToRender.length - 1;

  useEffect(() => {
    if (ticketId) {
      if (ticketId !== ticketsStore.currentTicketId) {
        ticketsStore.resetAnswers();
        setCurrentQuestionIndex(0);
        ticketsStore.getTicketQuestions(ticketId);
      }
    } else {
      setCurrentQuestionIndex(0);
      localStorage.removeItem(storageSelectors.currentQuestionPage);
      examStore.getExam();
    }
  }, [ticketId]);

  function handleButtonClick(index: number) {
    if (index >= 0 && index < questionsToRender.length) {
      setCurrentQuestionIndex(index);
      localStorage.setItem(storageSelectors.currentQuestionPage, String(index));
    }
  }

  if (authStore.isLoading) return <Loader loaderStyle="huge" />;

  return (
    <div className={style.questions}>
      <div className={style.paginationWrapper}>
        <ul className={style.listPagination}>
          {questionsToRender.map((question, i) => {
            const answer = ticketsStore.answers.find(
              (answer) => answer.questionId === question.questionId
            );

            const isCorrect = answer?.isCorrect;
            const isInvalid = answer !== undefined && !isCorrect;
            const isCurrent = currentQuestionIndex === i;

            return (
              <li key={question.questionId + i}>
                <button
                  className={`${style.listPagination_button} ${
                    isCorrect || isInvalid
                      ? ""
                      : isCurrent
                      ? style.listPagination__button__current
                      : ""
                  } ${
                    isCorrect
                      ? style.listPagination__button__isCorrect
                      : isInvalid
                      ? style.listPagination__button__isInvalid
                      : ""
                  }`}
                  onClick={() => handleButtonClick(i)}
                  type="button"
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
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
