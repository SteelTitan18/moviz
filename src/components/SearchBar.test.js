import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FiltersContext } from "../App";
import SearchBar from "./SearchBar";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

// Mocks for context functions
const mockFilterByType = jest.fn();
const mockFilterByYear = jest.fn();

const renderSearchBar = () => {
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
        <SearchBar />
      </Router>
    </FiltersContext.Provider>
  );
};

describe("SearchBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the SearchBar component", () => {
    renderSearchBar();
    expect(screen.getByPlaceholderText(/Rechercher .../)).toBeInTheDocument();
    expect(screen.getByText(/Types/)).toBeInTheDocument();
  });

  // checking the input of the search bar
  test("allows input of a search query", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText(/Rechercher .../);
    fireEvent.change(input, { target: { value: "test query" } });
    expect(input.value).toBe("test query");
  });

  // simulation of type filter
  test("applies type filter when menu item is clicked", () => {
    renderSearchBar();
    fireEvent.click(screen.getByText(/Types/));
    fireEvent.click(screen.getByText(/Films/));
    expect(mockFilterByType).toHaveBeenCalledWith("movie");
  });

  // simulation of year filter

  test("filters by year correctly", () => {
    renderSearchBar();
    const yearInput = screen.getByPlaceholderText(/Année/);
    const applyButton = screen.getByText(/Appliquer/);

    fireEvent.change(yearInput, { target: { value: "2020" } });
    fireEvent.click(applyButton);
    expect(mockFilterByYear).toHaveBeenCalledWith("2020");
  });

  // cancelling year filter
  test("resets year filter when cancel button is clicked", () => {
    renderSearchBar();
    const cancelButton = screen.getByText(/Annuler/);

    fireEvent.click(cancelButton);
    expect(mockFilterByYear).toHaveBeenCalledWith("");
  });
});
