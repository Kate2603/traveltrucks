import { createSlice } from "@reduxjs/toolkit";

const LS_KEY = "traveltrucks:favorites";

function loadFromLS() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToLS(ids) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

const initialState = {
  ids: loadFromLS(), // массив id
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = String(action.payload);
      const exists = state.ids.includes(id);
      state.ids = exists
        ? state.ids.filter((x) => x !== id)
        : [...state.ids, id];
      saveToLS(state.ids);
    },
    clearFavorites(state) {
      state.ids = [];
      saveToLS([]);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
