import style from "./PageNotFound.module.scss";

import Button from "../../Ui/Button/Button";
import useNavigation from "../../tools/useNavigation";

export default function PageNotFound() {
  const { goToPath } = useNavigation();

  return (
    <div className={style.pageNotFound}>
      <div className={style.container}>
        <div className={style.infoSection}>
          <h3 className={style.infoSection__title}>Страница не найдена</h3>
          <p className={style.infoSection__description}>
            Возможно вы опечатались в адресе URL
          </p>
        </div>

        <div className={style.actions}>
          <Button
            type="button"
            text="На главную"
            onClick={() => goToPath("/menu")}
          />
        </div>
      </div>
    </div>
  );
}
