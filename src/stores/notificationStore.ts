import { makeAutoObservable } from "mobx";

interface INotificationStore {
  titleText: string;
  bodyText: string;
}

class NotificationStore implements INotificationStore {
  titleText = "";
  bodyText = "";

  constructor() {
    makeAutoObservable(this);
  }
}

const notificationStore = new NotificationStore();
export default notificationStore;
