import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Navbar } from "../../src/components/Navbar.jsx";

describe("Navbar", () => {
  it("toggle button flips aria-expanded", () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    const btn = screen.getByRole("button", { name: /toggle menu/i });
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });
  it("includes Home + Rooms links", () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByRole("link", { name: /home/i }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: /rooms/i }).getAttribute("href")).toBe("/rooms");
  });
});
