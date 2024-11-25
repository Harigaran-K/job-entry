import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header title", () => {
  render(<App />);
  // Check if the header contains the text "Online Book Shop"
  expect(screen.getByText(/online book shop/i)).toBeInTheDocument();
});
