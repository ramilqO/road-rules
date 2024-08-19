import axios from "axios";
import notificationStore from "../stores/notificationStore";

export default function errorHandling(error: unknown) {
  if (axios.isAxiosError(error)) {
    notificationStore.setBodyText(error.response?.data?.message);
  } else {
    notificationStore.setBodyText("Неизвестная ошибка. Попробуйте заново");
  }
}
