import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import authStore from "../../stores/Auth/authStore";

import style from "./Header.module.scss";

import ThemeToggle from "../../tools/ThemeToggle/ThemeToggle";
import Button from "../../Ui/Button/Button";

const Header = observer(() => {
  return (
    <header className={style.header}>
      <ThemeToggle />

      <nav className={style.navigation}>
        <ul className={style.navigation__auth}>
          <li className={style.navigation__authItem}>
            {authStore.isAuth === false ? (
              <Link
                to="/login"
                className={`${style.navigation__authItemButton} ${style["navigation__authItemButton--login"]}`}
              >
                Логин
              </Link>
            ) : (
              <p className={style.navigation__authItemDescription}>
                {authStore.userInfo.firstName} {authStore.userInfo.secondName}
              </p>
            )}
          </li>
          <li className={style.navigation__authItem}>
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
