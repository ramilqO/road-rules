import { useNavigate } from "react-router-dom";

import style from "./PageNotFound.module.scss";

import Button from "@/Ui/Button/Button";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={style.pageNotFound}>
      <div className={style.container}>
        <div className={style.infoSection}>
          <h3 className={style.infoSection_title}>Страница не найдена</h3>
          <p className={style.infoSection_description}>
            Возможно вы опечатались в адресе URL
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
};

export default PageNotFound;
