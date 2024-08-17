import Notification from "../../Components/Notification/Notification";

export default function Menu() {
  return (
    <div>
      Menu
      <Notification
        type="error"
        titleText="Title"
        bodyText="Body"
        button={{
          text: "Button text",
          onClick: () => console.log("Button clicked"),
        }}
      />
    </div>
  );
}
