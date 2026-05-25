import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { RoomCard } from "../../src/components/RoomCard.jsx";

const room = {
  id: "1",
  slug: "single-deluxe",
  name: "Single Deluxe",
  price: 2200,
  imageUrl: "/images/x.jpeg",
};

describe("RoomCard", () => {
  it("renders name, price, image alt, and link to /rooms/:slug", () => {
    render(
      <MemoryRouter>
        <RoomCard room={room} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Single Deluxe/)).toBeInTheDocument();
    // Locale-aware price formatting may render with/without thousands separator
    expect(screen.getByText(/R[\s ]?2[,.\s ]?200/)).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img.getAttribute("alt")).toBe("Single Deluxe");
    expect(
      screen.getByRole("link", { name: /features/i }).getAttribute("href"),
    ).toBe("/rooms/single-deluxe");
  });
});
