import { observer } from "mobx-react-lite";
import { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import style from "./Questions.module.scss";
import { IoMdExit } from "react-icons/io";

const Question = lazy(() => import("./Question/Question"));

import storageSelectors from "@/stores/Selectors/storageSelectors";
import helpers from "@/tools/Helpers/helpers";

import examStore from "@/stores/Exam/examStore";
import ticketsStore from "@/stores/Tickets/ticketsStore";

const localStorageCurrentQuestionPage = helpers.getLocalStorage(
  storageSelectors.currentQuestionPage
);

const Questions = observer(() => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (ticketsStore.questions.length === ticketsStore.answers.length) {
      navigate("/results");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketsStore.questions.length]);

  const handleButtonClick = (indexQuestion: number) => {
    if (indexQuestion >= 0 && indexQuestion < questionsToRender.length) {
      setCurrentQuestionIndex(indexQuestion);
      localStorage.setItem(
        storageSelectors.currentQuestionPage,
        String(indexQuestion)
      );
    }
  };

  return (
    <div className={style.questions}>
      <button
        className={style.questions_exit}
        onClick={() => navigate("/menu")}
      >
        <IoMdExit size="24px" />
      </button>
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
                      ? style.listPagination_button__current
                      : ""
                  } ${
                    isCorrect
                      ? style.listPagination_button__isCorrect
                      : isInvalid
                      ? style.listPagination_button__isInvalid
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
