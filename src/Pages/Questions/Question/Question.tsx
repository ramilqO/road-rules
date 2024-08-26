import { observer } from "mobx-react-lite";

import ticketsStore from "../../../stores/Tickets/ticketsStore";
import style from "./Question.module.scss";

import ArrowLeftIcon from "../../../../public/svg/question/ArrowLeftIcon";
import ArrowRightIcon from "../../../../public/svg/question/ArrowRightIcon";

const Question = observer(
  ({
    indexQuestion,
    action,
  }: {
    indexQuestion: number;
    action: (value: number) => void;
  }) => {
    const questions = ticketsStore.questions;
    const currentQuestion = questions[indexQuestion];

    const isFirstQuestion = indexQuestion === 1;
    const isLastQuestion = indexQuestion === questions.length - 1;

    if (!currentQuestion) return null;

    return (
      <div className={style.question}>
        {currentQuestion.img.length > 0 ? (
          <img
            src={currentQuestion.img}
            alt="Пустая фотография"
            className={style.question__img}
          />
        ) : (
          <div className={style.wrapperEmeptyImage}>
            <h1 className={style.wrapperEmeptyImage__title}>
              Вопрос без изображения
            </h1>
          </div>
        )}

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
            <button
              className={`${style.navigationList__button} ${
                isFirstQuestion && style["navigationList__button--disabled"]
              }`}
              disabled={isFirstQuestion}
              onClick={() => action(indexQuestion - 1)}
              type="button"
            >
              <span color="#f5f5f5">
                <ArrowLeftIcon />
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
              
              <ArrowRightIcon />
            </button>
          </li>
        </ul>
      </div>
    );
  }
);

export default Question;
