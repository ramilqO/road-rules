import axios from "axios";
import notificationStore from "../stores/notificationStore";

export default function errorHandling(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.log(error.message)
    notificationStore.setBodyText(String(error.message));
  } else {
    notificationStore.setBodyText("Неизвестная ошибка. Попробуйте заново");
  }
}
