import { useState } from "react";
import style from "./Questions.module.scss";
import Question from "./Question/Question";

export default function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  return (
    <div className={style.questions}>
      <div className={style.questions__paginationWrapper}>
        <ul className={style.questions__listPagination}>
          {Array.from({ length: 20 }, (_, i) => (
            <li className={style.listPagination__item} key={i}>
              <button
                className={`${style.listPagination__button} ${
                  currentQuestion === i + 1 &&
                  style["listPagination__button--current"]
                }`}
                onClick={() => setCurrentQuestion(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Question currentQuestion={currentQuestion} />
    </div>
  );
}
