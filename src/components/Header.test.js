import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { FiltersContext } from "../App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock for Header componants
jest.mock("./Logo", () => () => <div>Logo Component</div>);
jest.mock("./SearchBar", () => () => <div>SearchBar Component</div>);

// Mocks for context data
const mockFilterByType = jest.fn();
const mockFilterByYear = jest.fn();

const renderHeader = () => {
  // setting of the provider
  render(
    <FiltersContext.Provider
      value={{
        type: "",
        year: "",
        filterByType: mockFilterByType,
        filterByYear: mockFilterByYear,
      }}
    >
      <Router>
        <Header />
      </Router>
    </FiltersContext.Provider>
  );
};

describe("Header Component", () => {
  // check if the Logo and SearchBar are displayed
  test("renders the Header component with Logo and SearchBar", () => {
    renderHeader();
    expect(screen.getByText(/Logo Component/)).toBeInTheDocument();
    expect(screen.getByText(/SearchBar Component/)).toBeInTheDocument();
  });

  // check if the the class of the Header lke expected
  test("has a fixed position and appropriate styles", () => {
    renderHeader();

    // eslint-disable-next-line testing-library/no-node-access
    const header = screen.getByText(/Logo Component/).parentElement;

    expect(header).toHaveClass(
      "flex justify-between px-8 w-screen items-center border-b border-gray-600 z-50 bg-blue-950 fixed top-0 h-40"
    );
  });
});
