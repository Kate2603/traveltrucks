function norm(v) {
  return String(v ?? "")
    .trim()
    .toLowerCase();
}

export function itemKey(item) {
  const key = String(item?.key ?? "");
  const val = item?.value ?? item?.match ?? "";
  return val ? `${key}:${norm(val)}` : key;
}

export function matchCamperItem(camper, item) {
  if (!camper || !item || !item.key) return false;

  const key = item.key;

  if (item.type === "boolean") {
    return camper[key] === true;
  }

  if (item.type === "string") {
    const camperVal = norm(camper[key]);
    const expected = norm(item.value ?? item.match);
    if (!expected) return false;
    return camperVal === expected;
  }

  const raw = camper[key];

  if (typeof raw === "boolean") return raw === true;

  if (typeof raw === "string") {
    const camperVal = norm(raw);
    const expected = norm(item.value ?? item.match);
    if (!expected) return camperVal.length > 0;
    return camperVal === expected;
  }

  return false;
}

export function isFilterItemActive(filters, item) {
  const f = filters?.features ?? {};
  if (!item || !item.key) return false;

  if (item.type === "boolean") {
    return f[item.key] === true;
  }

  if (item.type === "string") {
    const current = norm(f[item.key]);
    const expected = norm(item.value ?? item.match);
    if (!expected) return false;
    return current === expected;
  }

  const v = f[item.key];
  if (typeof v === "boolean") return v === true;

  if (typeof v === "string") {
    const expected = norm(item.value ?? item.match);
    if (!expected) return v.trim().length > 0;
    return norm(v) === expected;
  }

  return false;
}

export function featureId(item) {
  return String(item?.key ?? "");
}

export function pickMatchedItems(camper, items, limit = Infinity) {
  if (!Array.isArray(items) || !camper) return [];

  const out = [];
  for (let i = 0; i < items.length; i += 1) {
    const it = items[i];
    if (matchCamperItem(camper, it)) out.push(it);
    if (out.length >= limit) break;
  }
  return out;
}

export function camperMatchesActiveFeatures(camper, filters, allItems) {
  const f = filters?.features ?? {};
  if (!camper) return false;

  const byKey = new Map();
  if (Array.isArray(allItems)) {
    for (let i = 0; i < allItems.length; i += 1) {
      const it = allItems[i];
      if (!it || !it.key) continue;
      const k = String(it.key);
      const arr = byKey.get(k) ?? [];
      arr.push(it);
      byKey.set(k, arr);
    }
  }

  const keys = Object.keys(f);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = f[key];

    if (val === false || val == null || val === "") continue;

    const itemsForKey = byKey.get(key);
    if (!itemsForKey || itemsForKey.length === 0) continue;

    const assumedType = itemsForKey[0].type;

    if (assumedType === "boolean") {
      if (val === true && camper[key] !== true) return false;
      continue;
    }

    if (assumedType === "string") {
      const selected = norm(val);
      if (!selected) continue;

      const chosenItem = itemsForKey.find(
        (it) => norm(it.value ?? it.match) === selected,
      ) ?? {
        key,
        type: "string",
        value: selected,
      };

      if (!matchCamperItem(camper, chosenItem)) return false;
      continue;
    }

    if (typeof val === "boolean" && val === true) {
      if (camper[key] !== true) return false;
    } else if (typeof val === "string" && val.trim().length > 0) {
      if (norm(camper[key]) !== norm(val)) return false;
    }
  }

  return true;
}
