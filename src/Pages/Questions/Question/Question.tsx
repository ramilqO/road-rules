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
}

const Question = observer((props: QuestionProps) => {
  const { indexQuestion, action, currentQuestion } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [currentQuestion?.img]);

  if (!currentQuestion) {
    return <QuestionNotFound />;
  }

  const currentAnswer = ticketsStore.answers.find(
    (answer) => answer.questionId === currentQuestion.questionId
  );
  const checkIsAnswer = !!currentAnswer;

  const handleAnswerClick = (
    answerId: string,
    currentIndexQuestion: number
  ) => {
    ticketsStore.sendingAnswer({
      ticketId: currentQuestion.ticketId,
      questionId: currentQuestion.questionId,
      answerId,
    });

    const questionIndexWithoutAnswer =
      getNextQuestionWithoutAnswer(currentIndexQuestion);
    action(questionIndexWithoutAnswer);
  };

  const getNextQuestionWithoutAnswer = (
    currentIndexQuestion: number
  ): number => {
    let nextIndex = currentIndexQuestion;
    for (
      let i = currentIndexQuestion + 1;
      i < ticketsStore.questions.length;
      i++
    ) {
      const question = ticketsStore.questions[i];
      const answerExists = ticketsStore.answers.some(
        (answer) => answer.questionId === question.questionId
      );
      if (!answerExists) {
        nextIndex = i;
        break;
      }
    }
    if (nextIndex === currentIndexQuestion) {
      for (let i = 0; i < currentIndexQuestion; i++) {
        const question = ticketsStore.questions[i];
        const answerExists = ticketsStore.answers.some(
          (answer) => answer.questionId === question.questionId
        );
        if (!answerExists) {
          nextIndex = i;
          break;
        }
      }
    }
    return nextIndex;
  };

  return (
    <div className={style.question}>
      {currentQuestion.img ? (
        <>
          {isLoading && <Loader loaderStyle="questionImgLoader" />}
          <img
            src={currentQuestion.img}
            alt="Изображение вопроса"
            className={isLoading ? style.hiddenImg : style.question_img}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </>
      ) : (
        <div className={style.wrapperEmptyImage}>
          <h1 className={style.wrapperEmptyImage_title}>
            Вопрос без изображения
          </h1>
        </div>
      )}

      <h1 className={style.question_titleQuestion}>
        {currentQuestion.question}
      </h1>

      <ul className={style.listAnswers}>
        {currentQuestion.answers.map(({ answerId, answerText }) => {
          const isOurAnswer = currentAnswer?.ourAnswer === answerId;

          return (
            <li className={style.listAnswers_item} key={answerId}>
              <button
                type="button"
                className={`${style.listAnswers_button} ${
                  checkIsAnswer ? style.listAnswers_button__answer : ""
                }`}
                disabled={checkIsAnswer}
                onClick={() => handleAnswerClick(answerId, indexQuestion)}
              >
                {answerText}
              </button>

              {isOurAnswer && (
                <span className={style.listAnswers_thisAnswer}>Ваш ответ</span>
              )}
            </li>
          );
        })}
      </ul>

      <QuestionNavigationList
        indexQuestion={indexQuestion}
        action={action}
        getNextQuestionWithoutAnswer={getNextQuestionWithoutAnswer}
      />
    </div>
  );
});

export default Question;
