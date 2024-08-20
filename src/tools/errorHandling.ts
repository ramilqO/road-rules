import axios from "axios";
import notificationStore from "../stores/notificationStore";

export default function errorHandling(error: unknown) {
  // Если у нас есть ошибка + есть сообщение от сервера о ошибке то это 👇

  if (axios.isAxiosError(error) && error.response?.data?.message) {
    notificationStore.setNotification({
      type: "error",
      titleText: "Ошибка",
      bodyText: error.response?.data?.message,
    });
  } else if (error instanceof Error) {
    // Если у нас есть всё таки ошибка, но нет сообщения от сервера то это 👇

    notificationStore.setNotification({
      type: "error",
      titleText: "Неизвестная ошибка",
      bodyText: error.message,
    });
  }
}
