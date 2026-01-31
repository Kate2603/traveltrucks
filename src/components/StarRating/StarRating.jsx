import { Icon } from "../../ui/icons/icons.jsx";
import styles from "./StarRating.module.css";

export default function StarRating({ value = 0, max = 5 }) {
  const v = Math.max(0, Math.min(max, Number(value) || 0));
  const full = Math.round(v);

  return (
    <div className={styles.stars} aria-label={`Rating ${v} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < full ? styles.on : styles.off}
          aria-hidden="true"
        >
          <Icon name="icon-star" size={16} />
        </span>
      ))}
    </div>
  );
}
