import Button from "../../Ui/Button/Button";
import style from "./Menu.module.scss";

function Menu() {
  return (
    <div className={style.wrapper}>
      <div className={style.menu}>
        <Button text="Экзамен" />

        <ul className={style.menu__listTickets}>
          {Array.from({ length: 6 }, (_, i) => (
            <li className={style.listTickets__itemTicket} key={i}>
              <Button buttonStyle="ticketButton" text={`Билет ${i + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
