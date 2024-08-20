import { makeAutoObservable } from "mobx";

interface Button {
  buttonText: string;
  buttonAction: () => void;
}

interface NotificationInfo {
  type: "basic" | "error";
  titleText: string;
  bodyText: string;
  button?: Button;
}

class NotificationStore {
  notification: NotificationInfo | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setNotification(notificationInfo: NotificationInfo) {
    this.notification = notificationInfo;
    console.log(this.notification.titleText, this.notification.bodyText)
  }

  deleteNotification() {
    this.notification = null;
  }
}

const notificationStore = new NotificationStore();
export default notificationStore;
