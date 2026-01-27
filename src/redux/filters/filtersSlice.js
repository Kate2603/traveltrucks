import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  bodyType: "", // "panelTruck" | "fullyIntegrated" | "alcove" | ""
  features: {
    AC: false,
    kitchen: false,
    bathroom: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setBodyType(state, action) {
      state.bodyType = action.payload;
    },
    toggleFeature(state, action) {
      const key = action.payload;
      state.features[key] = !state.features[key];
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setBodyType, toggleFeature, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
