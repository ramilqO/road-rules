import { useEffect, useState } from "react";
import registerStore from "../../stores/Auth/registerStore";
import styles from "./SecurityPassword.module.scss";

const SecurityPassword = ({ password }: { password: string }) => {
  const [validation, setValidation] = useState<number>(
    // registerStore.securityPasswordField(password)
    2,
  );
  // Что бы проверить что блок рендерится, ты можешь написать здесь лог, если он появляется, значит комопнент рендерится и дело в другом
  console.log("SecurityPassword");
  useEffect(() => {
    setValidation(registerStore.securityPasswordField(password));
  }, [password]);

  return (
    <div className={styles.passwordStrengthContainer}>
      <div className={styles.passwordStrengthMessage} />
      <div className={styles.passwordStrengthBar}>
        <div
          className={`${styles.bar} ${
            validation >= 1 ? styles["bar-step1"] : ""
          }`}
        />
        <div
          className={`${styles.bar} ${
            validation >= 2 ? styles["bar-step2"] : ""
          }`}
        />
        <div
          className={`${styles.bar} ${
            validation >= 3 ? styles["bar-step3"] : ""
          }`}
        />
        <div
          className={`${styles.bar} ${
            validation >= 4 ? styles["bar-step4"] : ""
          }`}
        />
      </div>
    </div>
  );
};

export default SecurityPassword;
