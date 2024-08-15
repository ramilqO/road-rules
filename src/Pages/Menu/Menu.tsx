import Notification from "../../Components/Notification/Notification";

export default function Menu() {
  return (
    <div>
      Menu
      <Notification
        titleText="Title"
        bodyText="Body"
        button={{
          text: "Привет",
          onClick: () => console.log("Button clicked"),
        }}
      />
    </div>
  );
}
