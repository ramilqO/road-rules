import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Question.module.scss";

import ArrowLeftIcon from "../../../../public/svg/question/ArrowLeftIcon";
import ArrowRightIcon from "../../../../public/svg/question/ArrowRightIcon";

import Loader from "../../../Ui/Loader/Loader";
import Button from "../../../Ui/Button/Button";
import ticketsStore from "../../../stores/Tickets/ticketsStore";

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
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const checkIsAnswer = ticketsStore.answers[indexQuestion] !== undefined;

    useEffect(() => {
      setIsLoading(true);
    }, [currentQuestion?.img]);

    if (!currentQuestion) {
      return (
        <div className={style.questionNotFound}>
          <div className={style.container}>
            <div className={style.infoSection}>
              <h3 className={style.infoSection__title}>Билет не найдено</h3>
              <p className={style.infoSection__description}>
                Пожалуйста, проверьте, правильный ли билет указан в URL, или
                убедитесь, что билет еще не был удален. Возможно, произошла
                ошибка при его загрузке.
              </p>
            </div>

            <div className={style.actions}>
              <Button
                type="button"
                text="На главную"
                onClick={() => navigate("/menu")}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={style.question}>
        {currentQuestion.img ? (
          <>
            {isLoading && (
              <div>
                <Loader loaderStyle="questionImgLoader" />
              </div>
            )}
            <img
              src={currentQuestion.img}
              alt="Изображение вопроса"
              className={isLoading ? style.hiddenImg : style.question__img}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </>
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
              <button
                type="button"
                className={`${style.listAnswers__button} ${
                  checkIsAnswer ? style["listAnswers__button--answer"] : ""
                } ${
                  checkIsAnswer &&
                  ticketsStore.answers[indexQuestion]?.ourAnswer ===
                    answer.answerId
                    ? style["listAnswers__button--thisAnswer"]
                    : ""
                }`}
                disabled={checkIsAnswer}
                onClick={() => {
                  ticketsStore.sendingAnswer({
                    ticketId: currentQuestion.ticketId,
                    questionId: currentQuestion.questionId,
                    answerId: answer.answerId,
                  });
                  action(indexQuestion + 1);
                }}
              >
                <span
                  className={`${style.listAnswers__buttonText} ${
                    checkIsAnswer
                      ? style["listAnswers__buttonText--answer"]
                      : ""
                  } ${
                    checkIsAnswer &&
                    ticketsStore.answers[indexQuestion]?.ourAnswer ===
                      answer.answerId
                      ? style["listAnswers__buttonText--thisAnswer"]
                      : ""
                  }`}
                >
                  {answer.answerText}
                </span>
                {ticketsStore.answers[indexQuestion]?.ourAnswer ===
                  answer.answerId && (
                  <span className={style.listAnswers__thisAnswer}>
                    Ваш ответ
                  </span>
                )}
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
