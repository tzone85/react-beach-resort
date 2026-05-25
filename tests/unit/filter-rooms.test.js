import { describe, expect, it } from "vitest";
import { filterRooms } from "../../src/services/filter-rooms.js";

const sample = [
  { id: "1", slug: "a", type: "single", price: 1000, size: 200, capacity: 1, pets: false, breakfast: false },
  { id: "2", slug: "b", type: "double", price: 2000, size: 400, capacity: 2, pets: true,  breakfast: true  },
  { id: "3", slug: "c", type: "family", price: 4000, size: 700, capacity: 4, pets: true,  breakfast: true  },
];

describe("filterRooms", () => {
  it("returns all when criteria is empty / default", () => {
    expect(filterRooms(sample, {})).toHaveLength(3);
  });
  it("filters by type", () => {
    expect(filterRooms(sample, { type: "double" })).toEqual([sample[1]]);
  });
  it("filters by minCapacity", () => {
    expect(filterRooms(sample, { minCapacity: 2 })).toHaveLength(2);
  });
  it("filters by maxPrice", () => {
    expect(filterRooms(sample, { maxPrice: 1500 })).toEqual([sample[0]]);
  });
  it("filters by minSize", () => {
    expect(filterRooms(sample, { minSize: 500 })).toEqual([sample[2]]);
  });
  it("filters by petsAllowed", () => {
    expect(filterRooms(sample, { petsAllowed: true })).toHaveLength(2);
  });
  it("filters by breakfastIncluded", () => {
    expect(filterRooms(sample, { breakfastIncluded: true })).toHaveLength(2);
  });
  it("combines criteria with AND semantics", () => {
    expect(
      filterRooms(sample, { type: "family", minCapacity: 3, petsAllowed: true }),
    ).toEqual([sample[2]]);
  });
  it("returns empty when nothing matches", () => {
    expect(filterRooms(sample, { type: "single", minCapacity: 10 })).toEqual([]);
  });
});
