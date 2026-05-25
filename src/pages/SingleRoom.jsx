import { Link, useParams } from "react-router-dom";
import { Banner } from "../components/Banner.jsx";
import { Hero } from "../components/Hero.jsx";
import { findRoomBySlug, useRooms } from "../services/use-rooms.js";

export function SingleRoom() {
  const { slug } = useParams();
  const { rooms, loading, error } = useRooms();

  if (loading) return <p role="status" className="centered">Loading room…</p>;
  if (error) return <p role="alert" className="centered">Couldn’t load room.</p>;

  const room = findRoomBySlug(rooms, slug);
  if (!room) {
    return (
      <Hero>
        <Banner title="404" subtitle={`Room "${slug}" not found`}>
          <Link to="/rooms" className="btn-primary">back to rooms</Link>
        </Banner>
      </Hero>
    );
  }

  return (
    <>
      <Hero hero="roomsHero">
        <Banner title={`-- ${room.name} --`}>
          <Link to="/rooms" className="btn-primary">back to rooms</Link>
        </Banner>
      </Hero>
      <section className="single-room">
        <div className="single-room-images">
          <img src={room.imageUrl} alt={room.name} />
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{room.description}</p>
          </article>
          <article className="info">
            <h3>Info</h3>
            <h6>price: R{room.price.toLocaleString()} / night</h6>
            <h6>size: {room.size} m²</h6>
            <h6>capacity: {room.capacity} guests</h6>
            <h6>{room.pets ? "Pets allowed" : "No pets"}</h6>
            <h6>{room.breakfast ? "Breakfast included" : "Breakfast not included"}</h6>
          </article>
        </div>
        <section className="room-extras">
          <h6>extras</h6>
          <ul>
            {room.extras.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </section>
      </section>
    </>
  );
}
