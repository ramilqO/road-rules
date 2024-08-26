import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ticketsStore from "../../../stores/Tickets/ticketsStore";
import style from "./Question.module.scss";

const Question = observer(
  ({
    indexQuestion,
    action,
  }: {
    indexQuestion: number;
    action: (value: number) => void;
  }) => {
    const { ticketId } = useParams();

    const questions = ticketsStore.questions;
    const currentQuestion = questions[indexQuestion];

    const isFirstQuestion = indexQuestion === 1;
    const isLastQuestion = indexQuestion === questions.length - 1;

    useEffect(() => {
      ticketsStore.getTicketQuestions(String(ticketId));
    }, [ticketId]);

    if (!currentQuestion) return null;

    return (
      <div className={style.question}>
        <img
          src={
            currentQuestion.img.length > 0
              ? currentQuestion.img
              : "/public/png/empty-image.png"
          }
          alt="Пустая фотография"
          className={style.question__img}
        />

        <h1 className={style.question__titleQuestion}>
          {currentQuestion.question}
        </h1>

        <ul className={style.question__listAnswers}>
          {currentQuestion.answers.map((answer) => (
            // TODO: у тебя есть компонент кнопки, не нужно заново их рисовать
            <li className={style.listAnswers__item} key={answer.answerId}>
              <button type="submit" className={style.listAnswers__button}>
                {answer.answerText}
              </button>
            </li>
          ))}
        </ul>

        <ul className={style.question__navigationList}>
          <li className={style.navigationList__item}>
            <button
              className={`${style.navigationList__button} ${
                isFirstQuestion && style["navigationList__button--disabled"]
              }`}
              disabled={isFirstQuestion}
              onClick={() => action(indexQuestion - 1)}
              type="button"
            >
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
            <button
              className={`${style.navigationList__button} ${
                isLastQuestion && style["navigationList__button--disabled"]
              }`}
              disabled={isLastQuestion}
              onClick={() => action(indexQuestion + 1)}
              type="button"
            >
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
  },
);

export default Question;
