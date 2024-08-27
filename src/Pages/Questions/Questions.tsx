import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import style from "./Questions.module.scss";

import Question from "./Question/Question";
import Loader from "../../Ui/Loader/Loader";

import authStore from "../../stores/Auth/authStore";
import ticketsStore from "../../stores/Tickets/ticketsStore";
import examStore from "../../stores/Exam/examStore";

const Questions = observer(() => {
  const { ticketId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questionsToRender =
    ticketsStore.questions.length > 0 ? ticketsStore.questions : examStore.exam;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionsToRender.length - 1;

  function handleButtonClick(index: number) {
    if (index >= 0 && index < questionsToRender.length) {
      setCurrentQuestionIndex(index);
    }
  }

  if (ticketId)
    useEffect(() => {
      ticketsStore.getTicketQuestions(String(ticketId));
    }, []);
  else {
    useEffect(() => {
      examStore.getExam();
    }, []);
  }

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
              <button
                className={`${style.listPagination__button} ${
                  currentQuestionIndex === i &&
                  style["listPagination__button--current"]
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
        action={(newCurrentQuestionIndex) =>
          handleButtonClick(newCurrentQuestionIndex)
        }
        currentQuestion={questionsToRender[currentQuestionIndex]}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
});

export default Questions;
