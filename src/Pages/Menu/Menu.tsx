import { observer } from "mobx-react-lite";

import authStore from "../../stores/Auth/authStore";
import loginStore from "../../stores/Auth/loginStore";
import registerStore from "../../stores/Auth/registerStore";

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
    <div>
      <h1>Menu</h1>

      {authStore.isLoading === false ? authStore.isAuth === false ? (
        <>
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
              authStore.logout();
            }}
          >
            Выйти
          </button>
        </>
      ) : (
        <p>
          {authStore.data.firstName} {authStore.data.secondName} {`-->`}{" "}
          {authStore.data.email}
        </p>
      ) : <p>Loading...</p>}
    </div>
  );
});

export default Menu;
