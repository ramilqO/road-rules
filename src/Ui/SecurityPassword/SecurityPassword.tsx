import { useState, useEffect } from "react";
import styles from "./SecurityPassword.module.scss";
import registerStore from "../../stores/Auth/registerStore";

const SecurityPassword = ({ password }: { password: string }) => {
  const [validation, setValidation] = useState<number>(
    // registerStore.securityPasswordField(password)
    2
  );

  useEffect(() => {
    setValidation(registerStore.securityPasswordField(password));
  }, [password]);

  return (
    <div className={styles.passwordStrengthContainer}>
      <div className={styles.passwordStrengthMessage}></div>
      <div className={styles.passwordStrengthBar}>
        <div
          className={`${styles.bar} ${
            validation >= 1 ? styles["bar-step1"] : ""
          }`}
        ></div>
        <div
          className={`${styles.bar} ${
            validation >= 2 ? styles["bar-step2"] : ""
          }`}
        ></div>
        <div
          className={`${styles.bar} ${
            validation >= 3 ? styles["bar-step3"] : ""
          }`}
        ></div>
        <div
          className={`${styles.bar} ${
            validation >= 4 ? styles["bar-step4"] : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default SecurityPassword;
