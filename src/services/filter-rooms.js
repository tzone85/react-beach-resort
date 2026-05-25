/**
 * Pure filter for the rooms list. Tested independently.
 */
export function filterRooms(rooms, criteria = {}) {
  const {
    type = "all",
    minCapacity = 1,
    maxPrice = Infinity,
    minSize = 0,
    petsAllowed = false,
    breakfastIncluded = false,
  } = criteria;
  return rooms.filter((r) => {
    if (type !== "all" && r.type !== type) return false;
    if (r.capacity < minCapacity) return false;
    if (r.price > maxPrice) return false;
    if (r.size < minSize) return false;
    if (petsAllowed && !r.pets) return false;
    if (breakfastIncluded && !r.breakfast) return false;
    return true;
  });
}
