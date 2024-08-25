import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import style from "./Menu.module.scss";

import Button from "../../Ui/Button/Button";

import ticketsStore from "../../stores/Tickets/ticketsStore";
import authStore from "../../stores/Auth/authStore";

const Menu = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    ticketsStore.getListTickets();
  }, []);

  if (authStore.isLoading) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.menu}>
        <Button text="Экзамен" />

        <ul className={style.menu__listTickets}>
          {ticketsStore.tickets.map((ticket, i) => (
            <li className={style.listTickets__itemTicket} key={i}>
              <Button
                buttonStyle="ticketButton"
                text={`Билет ${i + 1}`}
                onClick={() => navigate(`/menu/${String(ticket)}`)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Menu;
