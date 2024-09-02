import { observer } from "mobx-react-lite";

import registerStore from "@/stores/Auth/registerStore";
import styles from "./SecurityPassword.module.scss";

const SecurityPassword = observer(() => {
  const { steps, message } = registerStore.securityPasswordField(
    registerStore.userPassword
  );

  if (!registerStore.passwordFieldIsSuccess) return;

  return (
    <>
      <div className={styles.securityPasswordMessage}>
        <p className={styles.securityPasswordMessage__description}>
          Надёжность пароля: {message}
        </p>
      </div>
      <div className={styles.securityPassword}>
        {steps === 1 && (
          <div
            className={`${styles.bar} ${
              steps >= 1 ? styles["bar--step1"] : ""
            }`}
          />
        )}
        {steps > 1 && steps <= 3 && (
          <div
            className={`${styles.bar} ${
              steps >= 2 ? styles["bar--step2"] : ""
            }`}
          />
        )}
        {steps === 4 && (
          <div
            className={`${styles.bar} ${
              steps >= 4 ? styles["bar--step3"] : ""
            }`}
          />
        )}
      </div>
    </>
  );
});

export default SecurityPassword;
