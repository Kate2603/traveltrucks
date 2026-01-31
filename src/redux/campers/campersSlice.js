import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { apiGetCamperById, apiGetCampers } from "../../api/campersApi";

function applyClientFiltering(items, filters) {
  const loc = (filters?.location || "").trim().toLowerCase();
  const bodyType = (filters?.bodyType || "").trim().toLowerCase();
  const features = filters?.features || {};

  return items.filter((c) => {
    // location: частковий збіг
    if (loc) {
      const cLoc = String(c?.location || "").toLowerCase();
      if (!cLoc.includes(loc)) return false;
    }

    // bodyType: точний збіг по form
    if (bodyType) {
      const form = String(c?.form || "").toLowerCase();
      if (form !== bodyType) return false;
    }

    // features: якщо чекбокс увімкнений — перевіряємо реальне поле
    for (const key of Object.keys(features)) {
      if (!features[key]) continue;

      const val = c?.[key];

      const ok =
        val === true ||
        val === "true" ||
        val === 1 ||
        val === "1" ||
        (typeof val === "string" && val.trim().length > 0) ||
        (typeof val === "number" && Number.isFinite(val));

      if (!ok) return false;
    }

    return true;
  });
}

// Забираємо все один раз (клієнтська фільтрація)
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async () => {
    const data = await apiGetCampers({
      page: 1,
      limit: 1000,
      serverParams: {},
    });

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    return [];
  },
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    const data = await apiGetCamperById(id);
    return data;
  },
);

const initialState = {
  allItems: [],
  filteredItems: [],
  visibleCount: 4,
  step: 4,

  isLoading: false,
  error: null,

  current: null,
  currentLoading: false,
  currentError: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    applyFilters(state, action) {
      const filters = action.payload || {};
      state.filteredItems = applyClientFiltering(state.allItems, filters);
      state.visibleCount = state.step;
    },
    loadMore(state) {
      state.visibleCount = Math.min(
        state.visibleCount + state.step,
        state.filteredItems.length,
      );
    },
    resetVisible(state) {
      state.visibleCount = state.step;
    },
    setStep(state, action) {
      const step = Number(action.payload) || 4;
      state.step = step;
      state.visibleCount = step;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCampers
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allItems = action.payload;
        state.filteredItems = action.payload;
        state.visibleCount = state.step;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load campers";
      })

      // fetchCamperById
      .addCase(fetchCamperById.pending, (state) => {
        state.currentLoading = true;
        state.currentError = null;
        state.current = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.currentLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.currentLoading = false;
        state.currentError = action.error?.message || "Failed to load camper";
      });
  },
});

export const { applyFilters, loadMore, resetVisible, setStep } =
  campersSlice.actions;

export default campersSlice.reducer;

/* =========================
   Memoized selectors (RTK)
   ========================= */

export const selectCampersState = (s) => s.campers;

export const selectCampersLoading = createSelector(
  [selectCampersState],
  (c) => c.isLoading,
);

export const selectCampersError = createSelector(
  [selectCampersState],
  (c) => c.error,
);

export const selectAllCampers = createSelector(
  [selectCampersState],
  (c) => c.allItems,
);

export const selectFilteredCampers = createSelector(
  [selectCampersState],
  (c) => c.filteredItems,
);

export const selectVisibleCount = createSelector(
  [selectCampersState],
  (c) => c.visibleCount,
);

export const selectVisibleCampers = createSelector(
  [selectFilteredCampers, selectVisibleCount],
  (items, count) => items.slice(0, count),
);

export const selectHasMore = createSelector(
  [selectFilteredCampers, selectVisibleCount],
  (items, count) => count < items.length,
);

export const selectCurrentCamper = createSelector(
  [selectCampersState],
  (c) => c.current,
);

export const selectCurrentLoading = createSelector(
  [selectCampersState],
  (c) => c.currentLoading,
);

export const selectCurrentError = createSelector(
  [selectCampersState],
  (c) => c.currentError,
);
