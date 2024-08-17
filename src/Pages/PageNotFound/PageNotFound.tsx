import style from './PageNotFound.module.scss';

import Button from '../../Ui/Button/Button';

export default function PageNotFound() {
  return (
    <div className={style.pageNotFound}>
      <div className={style.container}>
        <div className={style.infoSection}>
          <h3 className={style.infoSection__title}>Страница не найдена</h3>
          <p className={style.infoSection__description}>
            Возможно вы опечатались в адресе URL
          </p>
        </div>

        <div className={style.link}>
          {/* TODO: поправить типизацию */}
          <Button className={style.link__ToHome} to="/menu">
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
}
