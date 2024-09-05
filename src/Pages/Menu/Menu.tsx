import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import style from "./Menu.module.scss";

import Button from "@/Ui/Button/Button";
import Loader from "@/Ui/Loader/Loader";

import ticketsStore from "@/stores/Tickets/ticketsStore";
import authStore from "@/stores/Auth/authStore";

const Menu = observer(() => {
  const navigate = useNavigate();
  const [countTicketToRenderCount, setCountTicketToRender] = useState(8);

  const ticketsToRender = ticketsStore.tickets.slice(
    0,
    countTicketToRenderCount
  );

  useEffect(() => {
    ticketsStore.getListTickets();
  }, []);

  if (authStore.isLoading) return <Loader loaderStyle="huge" />;
  if (ticketsStore.tickets.length === 0) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.menu}>
        <Button text="Экзамен" onClick={() => navigate("/exam")} />

        <ul className={style.listTickets}>
          {ticketsToRender.map((ticket, i) => (
            <li className={style.listTickets_itemTicket} key={ticket}>
              <Button
                buttonStyle="ticketButton"
                text={`Билет ${i + 1}`}
                onClick={() => navigate(`/tickets/${String(ticket)}`)}
              />
            </li>
          ))}
        </ul>
        {countTicketToRenderCount !== ticketsStore.tickets.length ? (
          <Button
            text="Показать больше"
            onClick={() =>
              setCountTicketToRender(
                (countTicketToRenderCount) => countTicketToRenderCount + 8
              )
            }
          />
        ) : (
          <Button text="Скрыть" onClick={() => setCountTicketToRender(8)} />
        )}
      </div>
    </div>
  );
});

export default Menu;
