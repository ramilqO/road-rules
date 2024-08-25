import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import style from "./Menu.module.scss";

import Button from "../../Ui/Button/Button";

import ticketsStore from "../../stores/Tickets/ticketsStore";
import examStore from "../../stores/Exam/examStore";

const Menu = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    ticketsStore.getListTickets();
  }, []);

  if (ticketsStore.tickets.length === 0) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.menu}>
        <Button text="Экзамен" onClick={() => examStore.getExam()} />

        <ul className={style.menu__listTickets}>
          {ticketsStore.tickets.map((ticket, i) => (
            // Изменил на ticket т.к. index передавать нельзя по правилам как знаешь
            <li className={style.listTickets__itemTicket} key={ticket}>
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
