import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import styles from "./CamperCard.module.css";

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "0,00";
  return num.toFixed(2).replace(".", ",");
}

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favIds = useSelector((s) => s.favorites.ids);
  const isFav = favIds.includes(String(camper.id));

  const img =
    Array.isArray(camper.gallery) && camper.gallery[0] ? camper.gallery[0] : "";

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {img ? (
          <img className={styles.img} src={img} alt={camper.name || "Camper"} />
        ) : (
          <div className={styles.imgFallback}>No image</div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          <div>
            <h4 className={styles.title}>{camper.name || "Camper"}</h4>
            <div className={styles.meta}>
              <span>{camper.location || "Unknown location"}</span>
              <span className={styles.dot}>•</span>
              <span>Form: {camper.form || "—"}</span>
            </div>
          </div>

          <div className={styles.priceWrap}>
            <div className={styles.price}>€{formatPrice(camper.price)}</div>
            <button
              type="button"
              className={`${styles.favBtn} ${isFav ? styles.favActive : ""}`}
              onClick={() => dispatch(toggleFavorite(camper.id))}
              aria-label="Toggle favorite"
              title="Add to favorites"
            >
              ❤
            </button>
          </div>
        </div>

        <p className={styles.desc}>
          {camper.description
            ? String(camper.description)
            : "No description provided."}
        </p>

        <div className={styles.actions}>
          <a
            className={styles.more}
            href={`/catalog/${camper.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Show more
          </a>
        </div>
      </div>
    </article>
  );
}
