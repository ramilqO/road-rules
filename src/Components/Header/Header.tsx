import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import authStore from "../../stores/Auth/authStore";

import style from "./Header.module.scss";

import Button from "../../Ui/Button/Button";
import ThemeToggle from "../../tools/ThemeToggle/ThemeToggle";

const Header = observer(() => {
  return (
    <header className={style.header}>
      <ThemeToggle />

      <nav className={style.navigation}>
        <ul className={style.navigation__auth}>
          <li className={style.navigation__authItem}>
            {/* TODO: не нужно сверять на false, !authStore.isAuth делает тоже самое  */}
            {authStore.isAuth === false ? (
              <Link
                to="/login"
                // TODO: давай обе кнопки будут черными, без серого варианта
                className={`${style.navigation__authItemButton} ${style["navigation__authItemButton--login"]}`}
              >
                Логин
              </Link>
            ) : (
              <p className={style.navigation__authItemDescription}>
                {/* TODO: TS оишибки 'authStore.userInfo' is possibly 'null'.*/}
                {authStore.userInfo.firstName} {authStore.userInfo.secondName}
              </p>
            )}
          </li>
          <li className={style.navigation__authItem}>
            {/* TODO: не нужно сверять на false, !authStore.isAuth делает тоже самое  */}
            {authStore.isAuth === false ? (
              <Link
                to="/register"
                className={`${style.navigation__authItemButton} ${style["navigation__authItemButton--register"]}`}
              >
                Регистрация
              </Link>
            ) : (
              <Button onClick={() => authStore.logout()} text="Выйти" />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;
