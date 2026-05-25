import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRooms } from "./rooms-api.js";
import { filterRooms } from "./filter-rooms.js";

export function useRooms({ fetcher = fetchRooms } = {}) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetcher();
    if (result.ok) setRooms(result.rooms);
    else setError(result.error);
    setLoading(false);
  }, [fetcher]);

  useEffect(() => { load(); }, [load]);

  return { rooms, loading, error, refresh: load };
}

export function useFilteredRooms(rooms, criteria) {
  return useMemo(() => filterRooms(rooms, criteria), [rooms, criteria]);
}

export function findRoomBySlug(rooms, slug) {
  return rooms.find((r) => r.slug === slug) ?? null;
}
