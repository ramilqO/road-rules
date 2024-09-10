import ticketsStore from "@/stores/Tickets/ticketsStore";
import style from "./Results.module.scss";

import Result from "./Result/Result";

const Results = () => {
  return (
    <ul className={style.results}>
      {ticketsStore.answers.map((answer, i) => (
        <li key={answer.questionId} className={style.result}>
          <Result questionIndex={i} />
        </li>
      ))}
    </ul>
  );
};

export default Results;
