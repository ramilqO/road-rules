import { makeAutoObservable } from "mobx";

type ButtonType = "basic" | "error";

interface INotificationStore {
  type: ButtonType;
  titleText: string;
  bodyText: string;
  button: { text: string; onClick: () => void };
}

class NotificationStore implements INotificationStore {
  type: ButtonType = "basic";
  titleText = "";
  bodyText = "";
  button = { text: "", onClick: () => {} };

  constructor() {
    makeAutoObservable(this);
  }
}

const notificationStore = new NotificationStore();
export default notificationStore;
