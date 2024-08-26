import { useEffect } from "react";
import { useParams } from "react-router-dom";

import style from "./Question.module.scss";
import ticketsStore from "../../../stores/Tickets/ticketsStore";
import { observer } from "mobx-react-lite";

const Question = observer(({ indexQuestion }: { indexQuestion: number }) => {
  const { ticketId } = useParams();
  const currentQuestion = ticketsStore.questions[indexQuestion];

  useEffect(function () {
    ticketsStore.getTicketQuestions(String(ticketId));
  }, []);

  if (currentQuestion === undefined) return;

  return (
    <div className={style.question}>
      <img
        // Короче, если с бэка не прилеьтит фотография то тогда будет empty
        src={`${
          currentQuestion.img.length > 0
            ? currentQuestion.img
            : "/public/png/empty-image.png"
        }`}
        alt="Пустая фотография"
        className={style.question__img}
      />

      <h1 className={style.question__titleQuestion}>
        {currentQuestion.question}
      </h1>

      <ul className={style.question__listAnswers}>
        {currentQuestion.answers.map((answer) => (
          <li className={style.listAnswers__item} key={answer.answerId}>
            <button type="submit" className={style.listAnswers__button}>
              {answer.answerText}
            </button>
          </li>
        ))}
      </ul>

      <ul className={style.question__navigationList}>
        <li className={style.navigationList__item}>
          <button className={style.navigationList__button}>
            <span>
              <img
                src="/public/svg/question/Arrow left.svg"
                alt="Предыдущий вопрос"
              />
            </span>
            Предыдущий вопрос
          </button>
        </li>
        <li className={style.navigationList__item}>
          <button className={style.navigationList__button}>
            Следующий вопрос
            <span>
              <img
                src="/public/svg/question/Arrow right.svg"
                alt="Следующий вопрос"
              />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
});

export default Question;
