import { describe, expect, it, vi } from "vitest";
import { fetchRooms } from "../../src/services/rooms-api.js";

describe("fetchRooms", () => {
  it("returns fixture for mock:// apiBase", async () => {
    const r = await fetchRooms({ apiBase: "mock://" });
    expect(r.ok).toBe(true);
    expect(r.rooms.length).toBeGreaterThan(0);
  });
  it("hits /rooms for a real base", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: "1", slug: "a" }]),
    });
    const r = await fetchRooms({ apiBase: "https://api.test", fetchImpl });
    expect(fetchImpl).toHaveBeenCalledWith("https://api.test/rooms", expect.objectContaining({ mode: "cors" }));
    expect(r.rooms[0].id).toBe("1");
  });
  it("non-2xx returns error envelope", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: "down" });
    const r = await fetchRooms({ apiBase: "https://api.test", fetchImpl });
    expect(r.ok).toBe(false);
    expect(r.error.status).toBe(500);
  });
  it("transport error returns ok=false", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("ECONN"));
    const r = await fetchRooms({ apiBase: "https://api.test", fetchImpl });
    expect(r.ok).toBe(false);
    expect(r.error.status).toBe(0);
  });
  it("rejects non-array API payload", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ not: "array" }) });
    const r = await fetchRooms({ apiBase: "https://api.test", fetchImpl });
    expect(r.ok).toBe(false);
  });
});
