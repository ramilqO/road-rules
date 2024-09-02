import notificationStore from "@/stores/Notification/notificationStore";

const helpers = {
  capitalizeFirstLetter: (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  getLocalStorage: <T>(nameStorage: string): T | null => {
    const storedData = localStorage.getItem(nameStorage);

    if (!storedData) return null;

    try {
      return JSON.parse(storedData) as T;
    } catch (error) {
      notificationStore.setNotification({
        type: "error",
        titleText: "Ошибка формата данных",
        bodyText: `Не удалось распарсить данные по ключу "${nameStorage}" из localStorage. Проверьте, что данные имеют корректный формат.`,
      });
      return null;
    }
  },
};

export default helpers;
