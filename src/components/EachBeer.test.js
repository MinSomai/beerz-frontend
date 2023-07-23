import React from "react";
import { render, screen } from "@testing-library/react";
import EachBeer from "./EachBeer";

test("renders EachBeer component with beer data", () => {
  const mockBeer = {
    name: "Sample Beer",
    genre: "Sample Genre",
    description: "This is a sample beer description.",
  };

  render(<EachBeer beer={mockBeer} />);

  const beerNameElement = screen.getByText(mockBeer.name);
  expect(beerNameElement).toBeInTheDocument();

  const beerGenreElement = screen.getByText(mockBeer.genre);
  expect(beerGenreElement).toBeInTheDocument();

  const beerDescriptionElement = screen.getByText(mockBeer.description);
  expect(beerDescriptionElement).toBeInTheDocument();

  const beerImageElement = screen.getByAltText("hourzz beer");
  expect(beerImageElement).toBeInTheDocument();
  expect(beerImageElement.getAttribute("src")).toBe("./beerz.png");
});
