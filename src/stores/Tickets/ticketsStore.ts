import { makeAutoObservable } from "mobx";
import axios from "axios";

import authStore from "../Auth/authStore";
import errorHandling from "../../tools/errorHandling";
import tokenServices from "../tokenServices";

class TicketsStore {
  tickets: string[];

  constructor() {
    this.tickets = [];
    makeAutoObservable(this);
  }

  setTickets(tickets: string[]) {
    this.tickets = tickets;
  }

  async getListTickets() {
    authStore.setIsLoading(true);
    const persistedToken = authStore.userInfo?.token;

    if (!persistedToken) {
      errorHandling(
        "Ошибка при получении билетов. Отсутствует токен.",
        "Билетов"
      );
      return;
    }
    tokenServices.set(persistedToken);

    try {
      const { data } = await axios.get("api/tickets");
      this.setTickets(data);
    } catch (error) {
      errorHandling(error, "Билетов");
    } finally {
      authStore.setIsLoading(false);
    }
  }
}

const ticketsStore = new TicketsStore();
export default ticketsStore;
