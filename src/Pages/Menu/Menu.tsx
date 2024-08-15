import Notification from "../../Components/Notification/Notification";

export default function Menu() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      Menu
      <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <Notification titleText="Title" bodyText="Body text" button="Button" />
        <Notification titleText="Title" bodyText="Body text" />
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <Notification
          titleText="Title"
          bodyText="Body text"
          stateNotification="basicDarkTheme"
          button="Button"
        />
        <Notification
          titleText="Title"
          bodyText="Body text"
          stateNotification="basicDarkTheme"
        />
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <Notification
          titleText="Title"
          bodyText="Body text"
          button="Button"
          stateNotification="errorLightTheme"
        />
        <Notification
          titleText="Title"
          bodyText="Body text"
          stateNotification="errorLightTheme"
        />
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <Notification
          titleText="Title"
          bodyText="Body text"
          stateNotification="errorDarkTheme"
          button="Button"
        />
        <Notification
          titleText="Title"
          bodyText="Body text"
          stateNotification="errorDarkTheme"
        />
      </div>
    </div>
  );
}
