import axios from "axios";
import notificationStore from "../stores/notificationStore";

export default function errorHandling(error: unknown, fromError: string) {
  // Если error это текст ошибки
  if (typeof error === "string") {
    notificationStore.setNotification({
      type: "error",
      titleText: `Ошибка ${fromError}`,
      bodyText: error,
    });
  }
  // Если error это ошибка из бэка
  else if (axios.isAxiosError(error) && error.response?.data?.message) {
    notificationStore.setNotification({
      type: "error",
      titleText: `Ошибка ${fromError}`,
      bodyText: error.response?.data?.message,
    });
  }
  // Если error это неизвестная ошибка
  else if (error instanceof Error) {
    notificationStore.setNotification({
      type: "error",
      titleText: `Неизвестная ошибка из ${fromError}`,
      bodyText:
        error.message || error.message === "Network Error"
          ? "Нет соединения с интернетом"
          : error.message,
    });
  }
}
