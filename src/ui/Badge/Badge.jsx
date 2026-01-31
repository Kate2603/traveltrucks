import { Icon } from "../icons/icons.jsx";
import styles from "./Badge.module.css";

export default function Badge({ iconName, label }) {
  return (
    <span className={styles.badge}>
      {iconName ? (
        <span className={styles.icon} aria-hidden="true">
          <Icon name={iconName} size={20} />
        </span>
      ) : null}

      <span className={styles.text}>{label}</span>
    </span>
  );
}
