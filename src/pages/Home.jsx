import { Link } from "react-router-dom";
import { Banner } from "../components/Banner.jsx";
import { Hero } from "../components/Hero.jsx";

export function Home() {
  return (
    <Hero hero="defaultHero">
      <Banner title="Luxurious rooms" subtitle="Deluxe rooms starting at R1100">
        <Link to="/rooms" className="btn-primary">our rooms</Link>
      </Banner>
    </Hero>
  );
}
