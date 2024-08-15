export default function CrossIcon({
  stateNotification,
}: {
  stateNotification:
    | "basicLightTheme"
    | "basicDarkTheme"
    | "errorLightTheme"
    | "errorDarkTheme";
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke={`${
          (stateNotification === "basicLightTheme" && "#2C2C2C") ||
          (stateNotification === "basicDarkTheme" && "#fff") ||
          (stateNotification === "errorLightTheme" && "#900B09") ||
          (stateNotification === "errorDarkTheme" && "#fee9e7")
        }`}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
