import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import style from "./Menu.module.scss";

import Button from "../../Ui/Button/Button";
import Loader from "../../Ui/Loader/Loader";

import ticketsStore from "../../stores/Tickets/ticketsStore";
import authStore from "../../stores/Auth/authStore";

const Menu = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    ticketsStore.getListTickets();
  }, []);

  if (authStore.isLoading) return <Loader loaderStyle="huge" />;
  if (ticketsStore.tickets.length === 0) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.menu}>
        <Button text="Экзамен" onClick={() => navigate("/exam")} />

        <ul className={style.menu__listTickets}>
          {ticketsStore.tickets.map((ticket, i) => (
            <li className={style.listTickets__itemTicket} key={ticket}>
              <Button
                buttonStyle="ticketButton"
                text={`Билет ${i + 1}`}
                onClick={() => navigate(`/tickets/${String(ticket)}`)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Menu;
