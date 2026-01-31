import { useDispatch, useSelector } from "react-redux";
import {
  setBodyType,
  setLocation,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";

import { BODY_TYPES, EQUIPMENT } from "../../constants/ui.js";
import { Icon } from "../../ui/icons/icons.jsx";

import { itemKey, isFilterItemActive } from "../../utils/matchers.js";

import styles from "./CatalogFilters.module.css";

export default function CatalogFilters({ onApply }) {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  return (
    <aside className={styles.box} aria-label="Catalog filters">
      {/* Location */}
      <div className={styles.section}>
        <div className={styles.label}>Location</div>

        <div className={styles.locationField}>
          <span className={styles.locationIcon} aria-hidden="true">
            <Icon name="icon-map" size={20} className={styles.locationSvg} />
          </span>

          <input
            className={styles.locationInput}
            value={filters.location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            placeholder="Kyiv, Ukraine"
          />
        </div>
      </div>

      {/* Equipment */}
      <div className={styles.section}>
        <div className={styles.caption}>Filters</div>
        <h3 className={styles.h3}>Vehicle equipment</h3>

        <div className={styles.cardsGrid}>
          {EQUIPMENT.map((item) => {
            const active = isFilterItemActive(filters, item);

            return (
              <button
                key={itemKey(item)}
                type="button"
                className={`${styles.card} ${active ? styles.cardActive : ""}`}
                onClick={() =>
                  dispatch(
                    toggleFeature({
                      key: item.key,
                      type: item.type,
                      value: item.value,
                    }),
                  )
                }
                aria-pressed={active}
              >
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon name={item.iconName} size={32} />
                </span>

                <span className={styles.cardLabel}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle type */}
      <div className={styles.section}>
        <h3 className={styles.h3}>Vehicle type</h3>

        <div className={styles.cardsGrid}>
          {BODY_TYPES.map((item) => {
            const active = filters.bodyType === item.value;

            return (
              <button
                key={item.value}
                type="button"
                className={`${styles.card} ${active ? styles.cardActive : ""}`}
                onClick={() => dispatch(setBodyType(item.value))}
                aria-pressed={active}
              >
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon name={item.iconName} size={32} />
                </span>

                <span className={styles.cardLabel}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.primary} type="button" onClick={onApply}>
          Search
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
