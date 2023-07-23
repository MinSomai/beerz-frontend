import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BeersTab from "./BeersTab";
import BeersProvider from "../providers/BeersProvider";

test("renders BeersTab component with tabs", () => {
  render(
    <BeersProvider>
      <BeersTab />
    </BeersProvider>
  );

  const allBeersTab = screen.getByText(/All Beers/i);
  expect(allBeersTab).toBeInTheDocument();

  const myBeersTab = screen.getByText(/My Beers/i);
  expect(myBeersTab).toBeInTheDocument();

  expect(allBeersTab).toHaveClass("active");
  expect(myBeersTab).not.toHaveClass("active");

  fireEvent.click(myBeersTab);

  expect(allBeersTab).not.toHaveClass("active");
  expect(myBeersTab).toHaveClass("active");
});
