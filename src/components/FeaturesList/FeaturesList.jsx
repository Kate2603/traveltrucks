import Badge from "../../ui/Badge/Badge.jsx";
import styles from "./FeaturesList.module.css";

import { EQUIPMENT, DETAILS } from "../../constants/ui.js";
import { pickMatchedItems, itemKey } from "../../utils/matchers.js";

function startCaseFromCamelOrKebab(value) {
  const s = String(value ?? "").trim();
  if (!s) return "";

  const spaced = s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatDetailValue(key, raw) {
  if (raw === null || raw === undefined) return "";
  const asString = String(raw).trim();
  if (!asString) return "";

  if (key === "form") return startCaseFromCamelOrKebab(asString);

  if (key === "length" || key === "width" || key === "height") {
    const num = Number(raw);
    if (!Number.isNaN(num)) return `${num} m`;
    return asString;
  }

  if (key === "tank") {
    const num = Number(raw);
    if (!Number.isNaN(num)) return `${num} l`;
    return asString;
  }

  if (key === "consumption") {
    const num = Number(raw);
    if (!Number.isNaN(num)) return `${num}/100km`;
    return asString;
  }

  return asString;
}

export default function FeaturesList({ camper }) {
  const equipment = pickMatchedItems(camper, EQUIPMENT);

  const detailRows = DETAILS.map((d) => {
    const raw = camper?.[d.key];
    const value = formatDetailValue(d.key, raw);
    return { ...d, value };
  }).filter((r) => r.value && String(r.value).trim().length > 0);

  return (
    <section className={styles.card} aria-label="Features">
      <div className={styles.inner}>
        {/* EQUIPMENT */}
        <div className={styles.badgesGrid} aria-label="Equipment">
          {equipment.length ? (
            equipment.map((it) => (
              <div className={styles.badgeCell} key={itemKey(it)}>
                <Badge iconName={it.iconName} label={it.label} />
              </div>
            ))
          ) : (
            <div className={styles.empty}>No features info.</div>
          )}
        </div>

        {/* DETAILS */}
        <div className={styles.details} aria-label="Vehicle details">
          <h4 className={styles.h4}>Vehicle details</h4>
          <div className={styles.divider} />

          {detailRows.length ? (
            <ul className={styles.list}>
              {detailRows.map((row) => (
                <li className={styles.row} key={row.key}>
                  <span className={styles.left}>{row.label}</span>
                  <span className={styles.right}>{row.value}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>No details info.</div>
          )}
        </div>
      </div>
    </section>
  );
}
