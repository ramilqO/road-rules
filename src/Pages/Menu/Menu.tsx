import { observer } from "mobx-react-lite";

import authStore from "../../stores/Auth/authStore";
import loginStore from "../../stores/Auth/loginStore";
import registerStore from "../../stores/Auth/registerStore";
import logoutStore from "../../stores/Auth/logoutStore";

const exampleCredentialsLogin = {
  email: "user4@yandex.ru",
  password: "user4qweqwe",
};

const exampleCredentialsRegister = {
  email: "user4@yandex.ru",
  password: "user4qweqwe",
  firstName: "Олег",
  secondName: "Виник",
  department: "2",
};

const Menu = observer(() => {
  return (
    <>
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
          {authStore.isLoading ? "Загрузка..." : "Войти в аккаунт"}
        </button>

        <button
          onClick={() => {
            logoutStore.logout();
          }}
        >
          Выйти
        </button>
      </div>
      <p>
        {authStore.data.firstName.length > 0 &&
          `${authStore.data.firstName} ${authStore.data.secondName} --> ${authStore.data.email}`}
      </p>
    </>
  );
});

export default Menu;
