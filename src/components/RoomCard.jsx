import { Link } from "react-router-dom";

export function RoomCard({ room }) {
  return (
    <article className="room-card" data-testid={`room-card-${room.slug}`}>
      <div className="room-image">
        <img src={room.imageUrl} alt={room.name} loading="lazy" />
        <p className="price-top">R{room.price.toLocaleString()} / night</p>
      </div>
      <p className="room-info">{room.name}</p>
      <Link to={`/rooms/${room.slug}`} className="btn-primary room-link">
        Features
      </Link>
    </article>
  );
}
