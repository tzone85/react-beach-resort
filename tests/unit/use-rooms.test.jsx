import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { findRoomBySlug, useRooms } from "../../src/services/use-rooms.js";

describe("useRooms", () => {
  it("loads → success", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, rooms: [{ id: "1", slug: "x" }] });
    const { result } = renderHook(() => useRooms({ fetcher }));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.rooms).toHaveLength(1);
  });

  it("loads → error", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, error: { status: 500, message: "down" } });
    const { result } = renderHook(() => useRooms({ fetcher }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error.message).toBe("down");
  });
});

describe("findRoomBySlug", () => {
  const rooms = [{ slug: "a", name: "A" }, { slug: "b", name: "B" }];
  it("finds the matching room", () => {
    expect(findRoomBySlug(rooms, "b").name).toBe("B");
  });
  it("returns null when missing", () => {
    expect(findRoomBySlug(rooms, "zzz")).toBeNull();
  });
});
