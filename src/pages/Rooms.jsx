import { useState } from "react";
import { Banner } from "../components/Banner.jsx";
import { Hero } from "../components/Hero.jsx";
import { RoomCard } from "../components/RoomCard.jsx";
import { RoomFilter } from "../components/RoomFilter.jsx";
import { useFilteredRooms, useRooms } from "../services/use-rooms.js";

const DEFAULT_CRITERIA = {
  type: "all",
  minCapacity: 1,
  maxPrice: Infinity,
  minSize: 0,
  petsAllowed: false,
  breakfastIncluded: false,
};

export function Rooms() {
  const { rooms, loading, error, refresh } = useRooms();
  const [criteria, setCriteria] = useState({ ...DEFAULT_CRITERIA, maxPrice: 10000 });
  const filtered = useFilteredRooms(rooms, criteria);

  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="our rooms" />
      </Hero>
      <section className="rooms-container">
        {loading && <p role="status">Loading rooms…</p>}
        {error && (
          <div role="alert" className="alert">
            <p>Couldn’t load rooms ({error.message ?? "unknown"})</p>
            <button type="button" onClick={refresh}>Try again</button>
          </div>
        )}
        {!loading && !error && (
          <>
            <RoomFilter rooms={rooms} criteria={criteria} onChange={setCriteria} />
            {filtered.length === 0 ? (
              <p className="empty">No rooms match the current filters.</p>
            ) : (
              <div className="rooms-list">
                {filtered.map((room) => <RoomCard key={room.id} room={room} />)}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
