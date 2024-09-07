import style from "./Result.module.scss";

import InCorrectIcon from "/public/svg/result/InCorrectIcon";
import { IoMdCheckmark } from "react-icons/io";

const Result = () => {
  return (
    <div className={style.result}>
      {false ? (
        <img
          src="./././"
          alt="Изображение вопроса"
          className={style.result_img}
        />
      ) : (
        <div className={style.emptyImg}>
          <h1 className={style.emptyImg_title}>Вопрос без изображения</h1>
        </div>
      )}

      <h1 className={style.result_title}>
        В каком направление вам разрешен поворот
      </h1>
      <span className={style.result_checkCorrectAnswerText}>
        {/* <IoMdCheckmark /> кстати, у react-icons иконки идут с currentColor 😂 */}
        <InCorrectIcon />
        Не правильно
      </span>

      <ul className={style.listAnswers}>
        <li className={style.listAnswers_item}>
          <button className={style.listAnswers_button}>Только налево</button>
          <span className={style.listAnswers_etcInfo}>Ваш ответ</span>
        </li>
        <li className={style.listAnswers_item}>
          <button className={style.listAnswers_button}>Только направо</button>
          <span className={style.listAnswers_etcInfo}>Эталон</span>
        </li>
        <li className={style.listAnswers_item}>
          <button className={style.listAnswers_button}>Только вниз</button>
        </li>
        <li className={style.listAnswers_item}>
          <button className={style.listAnswers_button}>Только вверх</button>
        </li>
      </ul>

      <div className={style.helpForCorrectAnswer}>
        <h1 className={style.helpForCorrectAnswer_title}>Помощь</h1>
        <p className={style.helpForCorrectAnswer_text}>
          Согласно знаку 3.5 "Вам стоит прекратить изучать ПДД"
        </p>
      </div>
    </div>
  );
}

export default Result;
