/* ======================================================
   EQUIPMENT
====================================================== */

export const EQUIPMENT = [
  /* ---------- TRANSMISSION ---------- */
  {
    key: "transmission",
    type: "string",
    value: "automatic",
    label: "Automatic",
    iconName: "icon-automatic",
  },
  {
    key: "transmission",
    type: "string",
    value: "manual",
    label: "Manual",
    iconName: "icon-manual",
  },

  /* ---------- ENGINE ---------- */
  {
    key: "engine",
    type: "string",
    value: "petrol",
    label: "Petrol",
    iconName: "icon-petrol",
  },
  {
    key: "engine",
    type: "string",
    value: "diesel",
    label: "Diesel",
    iconName: "icon-diesel",
  },

  /* ---------- BOOLEAN FEATURES ---------- */
  {
    key: "AC",
    type: "boolean",
    label: "AC",
    iconName: "icon-ac",
  },
  {
    key: "bathroom",
    type: "boolean",
    label: "Bathroom",
    iconName: "icon-bathroom",
  },
  {
    key: "kitchen",
    type: "boolean",
    label: "Kitchen",
    iconName: "icon-kitchen",
  },
  {
    key: "TV",
    type: "boolean",
    label: "TV",
    iconName: "icon-tv",
  },
  {
    key: "radio",
    type: "boolean",
    label: "Radio",
    iconName: "icon-radio",
  },
  {
    key: "refrigerator",
    type: "boolean",
    label: "Refrigerator",
    iconName: "icon-refrigerator",
  },
  {
    key: "microwave",
    type: "boolean",
    label: "Microwave",
    iconName: "icon-microwave",
  },
  {
    key: "gas",
    type: "boolean",
    label: "Gas",
    iconName: "icon-gas",
  },
  {
    key: "water",
    type: "boolean",
    label: "Water",
    iconName: "icon-water",
  },
];

/* ======================================================
   BODY TYPES
====================================================== */

export const BODY_TYPES = [
  {
    value: "panelTruck",
    label: "Van",
    iconName: "icon-van",
  },
  {
    value: "fullyIntegrated",
    label: "Fully Integrated",
    iconName: "icon-fully-integrated",
  },
  {
    value: "alcove",
    label: "Alcove",
    iconName: "icon-alcove",
  },
];

/* ======================================================
   BADGES
====================================================== */

export const BADGES = EQUIPMENT;

/* ======================================================
   VEHICLE DETAILS
====================================================== */

export const DETAILS = [
  { key: "form", label: "Form" },
  { key: "length", label: "Length" },
  { key: "width", label: "Width" },
  { key: "height", label: "Height" },
  { key: "tank", label: "Tank" },
  { key: "consumption", label: "Consumption" },
];
