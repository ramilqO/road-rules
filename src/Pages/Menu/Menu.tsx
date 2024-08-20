import { observer } from "mobx-react-lite";
import authStore from "../../stores/Auth/authStore";
import loginStore from "../../stores/Auth/loginStore";
import registerStore from "../../stores/Auth/registerStore";
import Button from "../../Ui/Button/Button";

const exampleCredentialsLogin = {
  email: "user4@yandex.ru",
  password: "user5qweqwe",
};

const exampleCredentialsRegister = {
  email: "user4@yandex.ru",
  password: "user4qweqwe",
  firstName: "Олег",
  secondName: "Виник",
  department: "2",
};

const Menu = observer(() => {
  if (authStore.isLoading) {
    return <p>Загрузка...</p>;
  }

  if (authStore.isAuth) {
    return (
      <div>
        <p>
          {authStore.userInfo.firstName} {authStore.userInfo.secondName} --{`>`}{" "}
          {authStore.userInfo.email}
        </p>
        <Button onClick={() => authStore.logout()} text="Выйти" />
      </div>
    );
  }

  return (
    <div>
      <h1>Menu</h1>
      <button
        onClick={() => {
          registerStore.register(exampleCredentialsRegister);
        }}
      >
        Зарегистрироваться
      </button>
      <button
        onClick={() => {
          loginStore.login(exampleCredentialsLogin);
        }}
      >
        Войти в аккаунт
      </button>
    </div>
  );
});

export default Menu;
