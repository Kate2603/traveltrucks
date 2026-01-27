import { axiosInstance } from "./axiosInstance";

/**
 * API повертає або масив, або { total, items }.
 * Нам у redux потрібен масив кемперів.
 */
export async function apiGetCampers({ page, limit, serverParams }) {
  const res = await axiosInstance.get("/campers", {
    params: { page, limit, ...serverParams },
  });

  const data = res.data;

  // якщо прийшло { total, items }
  if (data && Array.isArray(data.items)) return data.items;

  // якщо прийшов масив
  return Array.isArray(data) ? data : [];
}

export async function apiGetCamperById(id) {
  const res = await axiosInstance.get(`/campers/${id}`);
  return res.data;
}
