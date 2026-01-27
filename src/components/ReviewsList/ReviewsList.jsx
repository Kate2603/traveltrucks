import StarRating from "../StarRating/StarRating";
import styles from "./ReviewsList.module.css";

function getInitial(name) {
  const s = String(name || "").trim();
  return s ? s[0].toUpperCase() : "A";
}

export default function ReviewsList({ reviews = [] }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <div className={styles.empty}>Пока нет отзывов.</div>;
  }

  return (
    <div className={styles.list}>
      {reviews.map((r, idx) => {
        const name = r.reviewer_name || r.name || "Anonymous";
        const rating = r.reviewer_rating ?? r.rating ?? 0;
        const text = r.comment || r.review || "—";

        return (
          <div key={`${name}-${idx}`} className={styles.item}>
            <div className={styles.top}>
              <div className={styles.left}>
                <div className={styles.avatar}>{getInitial(name)}</div>
                <div className={styles.nameWrap}>
                  <div className={styles.name}>{name}</div>
                  <StarRating value={rating} />
                </div>
              </div>
            </div>

            <div className={styles.text}>{text}</div>
          </div>
        );
      })}
    </div>
  );
}
