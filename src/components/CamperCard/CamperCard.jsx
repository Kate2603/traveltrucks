import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";

import Badge from "../../ui/Badge/Badge.jsx";
import { BADGES } from "../../constants/ui.js";
import { Icon } from "../../ui/icons/icons.jsx";

import { pickMatchedItems, itemKey } from "../../utils/matchers.js";

import styles from "./CamperCard.module.css";

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "0.00";
  return num.toFixed(2);
}

function getCoverImage(camper) {
  const first = Array.isArray(camper.gallery) ? camper.gallery[0] : null;

  if (first && typeof first === "object") {
    return first.original || first.thumb || "";
  }

  if (typeof first === "string") return first;

  return "";
}

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favIds = useSelector((s) => s.favorites.ids);

  const isFav = favIds.includes(String(camper.id));
  const img = getCoverImage(camper);

  const reviewsCount = Array.isArray(camper.reviews)
    ? camper.reviews.length
    : 0;
  const rating = Number(camper.rating ?? 0);

  const badges = pickMatchedItems(camper, BADGES, 6);

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        {/* Image */}
        <div className={styles.pic}>
          {img ? (
            <img
              className={styles.img}
              src={img}
              alt={camper.name || "Camper"}
              loading="lazy"
            />
          ) : (
            <div className={styles.imgFallback}>No image</div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.textContainer}>
            {/* Title + price */}
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{camper.name || "Camper"}</h3>

              <div className={styles.priceWrap}>
                <div className={styles.price}>€{formatPrice(camper.price)}</div>

                <button
                  type="button"
                  className={`${styles.heartBtn} ${
                    isFav ? styles.heartActive : ""
                  }`}
                  onClick={() => dispatch(toggleFavorite(camper.id))}
                  aria-label={
                    isFav ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Icon
                    name="icon-heart"
                    size={26}
                    className={styles.heartIcon}
                  />
                </button>
              </div>
            </div>

            {/* Reviews + location */}
            <div className={styles.details}>
              <div className={styles.reviews}>
                <span className={styles.star} aria-hidden="true">
                  <Icon name="icon-star" size={16} />
                </span>

                <span className={styles.detailsText}>
                  {rating.toFixed(1)} ({reviewsCount} Reviews)
                </span>
              </div>

              <div className={styles.location}>
                <span className={styles.map} aria-hidden="true">
                  <Icon name="icon-map" size={16} />
                </span>

                <span className={styles.detailsText}>
                  {camper.location || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={styles.desc}>
            {camper.description || "No description provided."}
          </p>

          {/* Badges */}
          <div className={styles.badgesContainer}>
            <div className={styles.badgesRow}>
              {badges.map((b) => (
                <Badge key={itemKey(b)} iconName={b.iconName} label={b.label} />
              ))}
            </div>
          </div>

          {/* Button */}
          <div className={styles.actions}>
            <Link className={styles.more} to={`/catalog/${camper.id}`}>
              Show more
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
