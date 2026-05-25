/**
 * Rooms API client. Default backend is the in-process fixture; set
 * VITE_API_BASE=https://your-cms to route through HTTP.
 */
import { ROOMS_FIXTURE } from "../fixtures/rooms.js";

const API_BASE = import.meta?.env?.VITE_API_BASE ?? "mock://";

export async function fetchRooms({ apiBase = API_BASE, fetchImpl = fetch } = {}) {
  if (apiBase === "mock://" || !apiBase) return { ok: true, rooms: ROOMS_FIXTURE };
  try {
    const response = await fetchImpl(`${apiBase}/rooms`, { mode: "cors" });
    if (!response.ok) return { ok: false, error: { status: response.status, message: response.statusText } };
    const data = await response.json();
    if (!Array.isArray(data)) return { ok: false, error: { status: 500, message: "API returned non-array" } };
    return { ok: true, rooms: data };
  } catch (err) {
    return { ok: false, error: { status: 0, message: err.message } };
  }
}
