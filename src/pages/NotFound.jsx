import { Link } from "react-router-dom";
import { Banner } from "../components/Banner.jsx";
import { Hero } from "../components/Hero.jsx";

export function NotFound() {
  return (
    <Hero>
      <Banner title="404" subtitle="Page not found">
        <Link to="/" className="btn-primary">return home</Link>
      </Banner>
    </Hero>
  );
}
