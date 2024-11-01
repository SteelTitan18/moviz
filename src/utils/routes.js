// definition of application routes
export const routes = {
  home: { path: "/" },
  search: {
    path: `/search`,
    navigation_path: (query) => `/search?query=${query}`,
  },
  movie_details: { path: (imdbID) => `/movies/${imdbID}` },
};
