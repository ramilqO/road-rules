import style from "./Question.module.scss";

function Question({ currentQuestion }: { currentQuestion: number }) {
  return (
    <div className={style.question}>
      <img
        // Короче, если с бэка не прилеьтит фотография то тогда будет empty
        src="/public/png/empty-image.png"
        alt="Пустая фотография"
        className={style.question__img}
      />

      <h1 className={style.question__titleQuestion}>
        Вопрос {currentQuestion}: Сдашь ты на права или нет
      </h1>

      <ul className={style.question__listAnswers}>
        {Array.from({ length: 4 }, (_, i) => (
          <li className={style.listAnswers__item} key={i}>
            <button type="submit" className={style.listAnswers__button}>
              Насколько ты оцениваешь вот эту ситуацию на дороге - {i + 1}
            </button>
          </li>
        ))}
      </ul>

      <ul className={style.question__navigationList}>
        <li className={style.navigationList__item}>
          <button className={style.navigationList__button}>
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
          <button className={style.navigationList__button}>
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
}

export default Question;
