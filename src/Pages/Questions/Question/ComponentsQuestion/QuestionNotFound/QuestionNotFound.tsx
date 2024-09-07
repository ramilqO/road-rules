import { useNavigate } from "react-router-dom";

import Button from "@/Ui/Button/Button";
import style from "./QuestionNotFound.module.scss";

const QuestionNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={style.questionNotFound}>
      <div className={style.container}>
        <div className={style.infoSection}>
          <h3 className={style.infoSection_title}>Билет не найден</h3>
          <p className={style.infoSection_description}>
            Пожалуйста, проверьте, правильный ли билет указан в URL, или
            убедитесь, что билет еще не был удален. Возможно, произошла ошибка
            при его загрузке.
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

export default QuestionNotFound;
