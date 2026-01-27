import CamperCard from "../CamperCard/CamperCard";
import styles from "./CamperList.module.css";

export default function CamperList({ items }) {
  if (!items.length) {
    return (
      <div className={styles.empty}>
        Nothing found. Try changing the filters.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((c) => (
        <CamperCard key={c.id} camper={c} />
      ))}
    </div>
  );
}
