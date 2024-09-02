import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import ticketsStore from "@/stores/Tickets/ticketsStore";
import style from "./Question.module.scss";

import Loader from "@/Ui/Loader/Loader";

import QuestionNavigationList from "./ComponentsQuestion/QuestionNavigationList/QuestionNavigationList";
import QuestionNotFound from "./ComponentsQuestion/QuestionNotFound/QuestionNotFound";

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
    }, [currentQuestion?.img]);

    if (!currentQuestion) {
      return <QuestionNotFound />;
    }

    const checkIsAnswer = ticketsStore.answers.some(
      (answer) => answer.questionId === currentQuestion.questionId,
    );
    //TODO: помоему если ты оставишь только эту переменную все будет работать точно так же, только заменить checkIsAnswer на currentAnswer
    const currentAnswer = ticketsStore.answers.find(
      (answer) => answer.questionId === currentQuestion.questionId,
    );

    const handleAnswerClick = (answerId: string) => {
      ticketsStore.sendingAnswer({
        ticketId: currentQuestion.ticketId,
        questionId: currentQuestion.questionId,
        answerId,
      });
      action(indexQuestion + 1);
    };

    return (
      <div className={style.question}>
        {currentQuestion.img ? (
          <>
            {isLoading && <Loader loaderStyle="questionImgLoader" />}
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

        <ul className={style.listAnswers}>
          {currentQuestion.answers.map(({ answerId, answerText }) => {
            const isAnswer = currentAnswer?.ourAnswer === answerId;

            return (
              <li className={style.listAnswers__item} key={answerId}>
                <button
                  type="button"
                  className={`${style.listAnswers__button} ${
                    checkIsAnswer ? style["listAnswers__button--answer"] : ""
                  }`}
                  disabled={checkIsAnswer}
                  onClick={() => handleAnswerClick(answerId)}
                >
                  {answerText}
                </button>

                {isAnswer && (
                  <span className={style.listAnswers__thisAnswer}>
                    Ваш ответ
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <QuestionNavigationList
          indexQuestion={indexQuestion}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          action={action}
        />
      </div>
    );
  },
);

export default Question;
