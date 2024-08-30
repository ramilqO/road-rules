import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import notificationStore from "../../../stores/Notification/notificationStore";
import style from "./Question.module.scss";
import ArrowLeftIcon from "../../../../public/svg/question/ArrowLeftIcon";
import ArrowRightIcon from "../../../../public/svg/question/ArrowRightIcon";
import Loader from "../../../Ui/Loader/Loader";

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

    useEffect(() => {
      setIsLoading(true);
    }, [currentQuestion.img]);

    if (!currentQuestion) {
      notificationStore.setNotification({
        type: "error",
        titleText: "⚠ Что-то пошло не по плану",
        bodyText: "Вопрос не был найден",
      });

      return null;
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
