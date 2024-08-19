import { observer } from "mobx-react-lite";

import loginStore from "../../stores/Auth/loginStore";
import registerStore from "../../stores/Auth/registerStore";
import logoutStore from "../../stores/Auth/logoutStore";

const Menu = observer(() => {
  const exampleCredentialsLogin = {
    email: "user3@yandex.ru",
    password: "user1qwe",
  };

  const exampleCredentialsRegister = {
    email: "user3@yandex.ru",
    password: "user1qwe",
    firstName: "Вася",
    secondName: "Пупкин",
    department: "1",
  };

  return (
    <div>
      <h1>Menu</h1>

      <button
        onClick={() => {
          registerStore.register(exampleCredentialsRegister);
        }}
      >
        Зарегистрироватся
      </button>

      <button
        onClick={() => {
          loginStore.login(exampleCredentialsLogin);
        }}
      >
        Войти в аккаунт
      </button>

      <button
        onClick={() => {
          logoutStore.logout();
        }}
      >
        Выйти
      </button>
    </div>
  );
});

export default Menu;
