import axios from "axios";
import notificationStore from "../stores/notificationStore";

export default function errorHandling(error: unknown, fromError: string) {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    notificationStore.setNotification({
      type: "error",
      titleText: `Ошибка ${fromError}`,
      bodyText: error.response?.data?.message,
    });
  } else if (error instanceof Error) {
    notificationStore.setNotification({
      type: "error",
      titleText: `Неизвестная ошибка из ${fromError}`,
      bodyText:
        error.message || error.message === "Network Error"
          ? "Нет соеденения с интернетом"
          : error.message,
    });
  }
}
