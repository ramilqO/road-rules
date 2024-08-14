import style from "./SecurityPassword.module.scss";

export default function SecurityPassword({ password }: { password: string }) {
  const isStep1Complete = password.length >= 8; // Если длина пароля больше 8
  const isStep2Complete =
    isStep1Complete && /[A-Z]/.test(password) && /[0-9]/.test(password); // Если длина пароля > 8 + есть заглавная буква
  const isStep3Complete =
    isStep2Complete && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password); // Если длина > 8 + заглавная буква + Symbol

  return (
    <div className={style.securityPassword}>
      <div
        className={`${style.securityPassword__field} ${
          isStep1Complete && style["securityPassword__field--full"]
        }`}
      ></div>
      <div
        className={`${style.securityPassword__field} ${
          isStep2Complete && style["securityPassword__field--full"]
        }`}
      ></div>
      <div
        className={`${style.securityPassword__field} ${
          isStep3Complete && style["securityPassword__field--full"]
        }`}
      ></div>
    </div>
  );
}
