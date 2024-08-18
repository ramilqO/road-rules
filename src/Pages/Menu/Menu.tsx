import { observer } from "mobx-react-lite";

import authOperations from "../../stores/Auth/authOperations";

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
          authOperations.register(exampleCredentialsRegister);
        }}
      >
        Зарегистрироватся
      </button>

      <button
        onClick={() => {
          authOperations.login(exampleCredentialsLogin);
        }}
      >
        Войти в аккаунт
      </button>
    </div>
  );
});

export default Menu;
