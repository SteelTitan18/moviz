import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieDisplay from "./MovieDisplay";
import { routes } from "../utils/routes";
import "@testing-library/jest-dom";

// Mockfor movie data
const mockMovie = {
  imdbID: "123456",
  Title: "Mock Test Title",
  Year: "2023",
  Type: "movie",
  Poster: "https://example.com/poster.jpg",
};

describe("MovieDisplay Component", () => {
  test("renders movie details correctly", () => {
    render(
      <MemoryRouter>
        <MovieDisplay movie={mockMovie} />
      </MemoryRouter>
    );

    // check for the movie title
    expect(screen.getByText(/Mock Test Title/)).toBeInTheDocument();
    // check for the movie year
    expect(screen.getByText(/2023/)).toBeInTheDocument();
    // check for the movie type
    expect(screen.getByText(/movie/i)).toBeInTheDocument();
  });

  test("renders the correct poster image", () => {
    render(
      <MemoryRouter>
        <MovieDisplay movie={mockMovie} />
      </MemoryRouter>
    );

    // check for movie poster
    const img = screen.getByAltText(/movie_poster/i);
    expect(img).toHaveAttribute("src", mockMovie.Poster);
  });

  test("navigates to movie details on click", () => {
    render(
      <MemoryRouter>
        <MovieDisplay movie={mockMovie} />
      </MemoryRouter>
    );

    // check for details page navigation
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      routes.movie_details.path(mockMovie.imdbID)
    );
  });
});
