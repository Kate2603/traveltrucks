import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  bodyType: null,
  features: {}, // boolean OR string values
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },

    setBodyType(state, action) {
      state.bodyType =
        state.bodyType === action.payload ? null : action.payload;
    },

    toggleFeature(state, action) {
      const payload = action.payload;

      // backward compatible: if dispatch(toggleFeature("kitchen"))
      if (typeof payload === "string") {
        const key = payload;
        if (!state.features) state.features = {};
        state.features[key] = !state.features[key];
        return;
      }

      const { key, type, value } = payload || {};
      if (!key) return;

      if (!state.features) state.features = {};

      if (type === "boolean") {
        state.features[key] = state.features[key] === true ? false : true;
        return;
      }

      if (type === "string") {
        const current = String(state.features[key] ?? "");
        const next = String(value ?? "");

        // click again => unset
        if (current === next) {
          delete state.features[key];
          return;
        }

        // set selected string variant
        state.features[key] = next;
        return;
      }

      // fallback: behave like boolean toggle
      if (typeof state.features[key] === "boolean") {
        state.features[key] = !state.features[key];
        return;
      }

      // if unknown, set true
      state.features[key] = true;
    },

    resetFilters(state) {
      state.location = "";
      state.bodyType = null;
      state.features = {};
    },
  },
});

export const { setLocation, setBodyType, toggleFeature, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
