import styles from "./FeaturesList.module.css";

const FEATURE_KEYS = [
  "transmission",
  "engine",
  "AC",
  "bathroom",
  "kitchen",
  "TV",
  "radio",
  "refrigerator",
  "microwave",
  "gas",
  "water",
];

const DETAIL_KEYS = [
  "form",
  "length",
  "width",
  "height",
  "tank",
  "consumption",
];

function isPresent(val) {
  if (val === true) return true;
  if (val === 1) return true;
  if (val === "true") return true;
  if (typeof val === "string" && val.trim().length > 0) return true;
  if (typeof val === "number" && !Number.isNaN(val)) return true;
  return false;
}

export default function FeaturesList({ camper }) {
  const features = FEATURE_KEYS.filter((k) => isPresent(camper?.[k]));
  const details = DETAIL_KEYS.filter((k) => isPresent(camper?.[k]));

  return (
    <div className={styles.wrap}>
      <div className={styles.block}>
        <h4 className={styles.h4}>Features</h4>
        <div className={styles.tags}>
          {features.length ? (
            features.map((k) => (
              <span key={k} className={styles.tag}>
                {k}: {String(camper[k]) === "true" ? "Yes" : String(camper[k])}
              </span>
            ))
          ) : (
            <span className={styles.muted}>No features info.</span>
          )}
        </div>
      </div>

      <div className={styles.block}>
        <h4 className={styles.h4}>Details</h4>
        <div className={styles.tags}>
          {details.length ? (
            details.map((k) => (
              <span key={k} className={styles.tag}>
                {k}: {String(camper[k])}
              </span>
            ))
          ) : (
            <span className={styles.muted}>No details info.</span>
          )}
        </div>
      </div>
    </div>
  );
}
