import { useDispatch, useSelector } from "react-redux";
import {
  setBodyType,
  setLocation,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";
import styles from "./CatalogFilters.module.css";

const BODY_TYPES = [
  { value: "", label: "Any" },
  { value: "panelTruck", label: "Panel Truck" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

const FEATURE_KEYS = [
  "AC",
  "kitchen",
  "bathroom",
  "TV",
  "radio",
  "refrigerator",
  "microwave",
  "gas",
  "water",
  "transmission",
  "engine",
];

export default function CatalogFilters({ onApply }) {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  return (
    <aside className={styles.box}>
      <h3 className={styles.h3}>Filters</h3>

      <label className={styles.label}>
        Location
        <input
          className={styles.input}
          value={filters.location}
          onChange={(e) => dispatch(setLocation(e.target.value))}
          placeholder="e.g. Kyiv"
        />
      </label>

      <div className={styles.group}>
        <div className={styles.groupTitle}>Body type (one)</div>
        <div className={styles.chips}>
          {BODY_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`${styles.chip} ${filters.bodyType === t.value ? styles.chipActive : ""}`}
              onClick={() => dispatch(setBodyType(t.value))}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.groupTitle}>Features (multiple)</div>
        <div className={styles.grid}>
          {FEATURE_KEYS.map((k) => (
            <label key={k} className={styles.check}>
              <input
                type="checkbox"
                checked={!!filters.features[k]}
                onChange={() => dispatch(toggleFeature(k))}
              />
              <span>{k}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primary} type="button" onClick={onApply}>
          Apply
        </button>
        <button
          className={styles.secondary}
          type="button"
          onClick={() => {
            dispatch(resetFilters());
            onApply();
          }}
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
