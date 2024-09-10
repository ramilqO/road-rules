import ticketsStore from "@/stores/Tickets/ticketsStore";
import style from "./Result.module.scss";

import InCorrectIcon from "/public/svg/result/InCorrectIcon";
import { IoMdCheckmark } from "react-icons/io";

const Result = ({ questionIndex }: { questionIndex: number }) => {
  const currentQuestion = ticketsStore.questions[questionIndex];
  const currentAnswer = ticketsStore.answers[questionIndex];
  const isInCorrectAnswer = !currentAnswer.isCorrect;

  return (
    <>
      {currentQuestion.img ? (
        <img
          src={currentQuestion.img}
          alt="Изображение вопроса"
          className={style.result_img}
        />
      ) : (
        <div className={style.emptyImg}>
          <h1 className={style.emptyImg_title}>Вопрос без изображения</h1>
        </div>
      )}

      <h1 className={style.result_title}>{currentQuestion.question}</h1>
      <span className={style.result_checkCorrectAnswer}>
        {currentAnswer.isCorrect ? (
          <>{<IoMdCheckmark />} Правильно</>
        ) : (
          <>{<InCorrectIcon />} Не правильно</>
        )}
      </span>

      <ul className={style.listAnswers}>
        {currentQuestion.answers.map(({ answerId, answerText }) => {
          const isOurAnswer = currentAnswer.ourAnswer === answerId;
          const isCorrectAnswer = currentAnswer.correctAnswer === answerId;
          const isOurCorrectAnswer = isCorrectAnswer && isOurAnswer;

          return (
            <li className={style.listAnswers_item} key={answerId}>
              <p className={style.listAnswers_button}>{answerText}</p>
              {!isOurCorrectAnswer ? (
                <>
                  {isOurAnswer && (
                    <span className={style.listAnswers_etcInfo}>Ваш ответ</span>
                  )}
                  {isCorrectAnswer && (
                    <span className={style.listAnswers_etcInfo}>Эталон</span>
                  )}
                </>
              ) : (
                <span className={style.listAnswers_etcInfo}>Ваш ответ</span>
              )}
            </li>
          );
        })}
      </ul>

      {isInCorrectAnswer && (
        <div className={style.helpForCorrectAnswer}>
          <h1 className={style.helpForCorrectAnswer_title}>Помощь</h1>
          <p className={style.helpForCorrectAnswer_text}>
            {currentAnswer.help}
          </p>
        </div>
      )}
    </>
  );
};

export default Result;
