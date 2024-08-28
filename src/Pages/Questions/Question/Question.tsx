import { lazy } from "react";
import { observer } from "mobx-react-lite";
import style from "./Question.module.scss";

const ArrowLeftIcon = lazy(
  () => import("../../../../public/svg/question/ArrowLeftIcon")
);
const ArrowRightIcon = lazy(
  () => import("../../../../public/svg/question/ArrowRightIcon")
);

interface IAnswer {
  answerText: string;
  answerId: string;
}

interface ICurrentQuestion {
  img: string;
  question: string;
  ticketId: string;
  questionId: string;
  answers: IAnswer[];
}

interface QuestionProps {
  indexQuestion: number;
  action: (value: number) => void;
  currentQuestion: ICurrentQuestion;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

const Question = observer(
  ({
    indexQuestion,
    action,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
  }: QuestionProps) => {
    if (!currentQuestion) return null;

    return (
      <div className={style.question}>
        {currentQuestion.img ? (
          <img
            src={currentQuestion.img}
            alt="Изображение вопроса"
            className={style.question__img}
          />
        ) : (
          <div className={style.wrapperEmptyImage}>
            <h1 className={style.wrapperEmptyImage__title}>
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
              <button type="button" className={style.listAnswers__button}>
                {answer.answerText}
              </button>
            </li>
          ))}
        </ul>

        <ul className={style.question__navigationList}>
          <li className={style.navigationList__item}>
            <button
              className={`${style.navigationList__button} ${
                isFirstQuestion ? style["navigationList__button--disabled"] : ""
              }`}
              disabled={isFirstQuestion}
              onClick={() => action(indexQuestion - 1)}
              type="button"
            >
              <span>
                <ArrowLeftIcon />
              </span>
              Предыдущий вопрос
            </button>
          </li>
          <li className={style.navigationList__item}>
            <button
              className={`${style.navigationList__button} ${
                isLastQuestion ? style["navigationList__button--disabled"] : ""
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
