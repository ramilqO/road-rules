import { useNavigate } from "react-router-dom";

import ticketsStore from "@/stores/Tickets/ticketsStore";
import style from "./Results.module.scss";

import Result from "./Result/Result";
import { IoMdExit } from "react-icons/io";

const Results = () => {
  const navigate = useNavigate();

  return (
    <ul className={style.results}>
      <button
        className={style.results_exit}
        onClick={() => navigate("/menu")}
      >
        <IoMdExit size="24px" />
      </button>
      {ticketsStore.answers.map((answer, i) => (
        <li key={answer.questionId} className={style.result}>
          <Result questionIndex={i} />
        </li>
      ))}
    </ul>
  );
};

export default Results;
