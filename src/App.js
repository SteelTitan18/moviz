import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./utils/routes";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Search from "./pages/SearchPage";
import { createContext, useState } from "react";
import MovieDetails from "./pages/MovieDetails";

export const FiltersContext = createContext();

function App() {
  const [type, setType] = useState();
  const [year, setYear] = useState();

  const filterByType = (type) => {
    setType(type);
  };
  const filterByYear = (year) => {
    setYear(year);
  };

  return (
    // Publishing context values to tree componanats
    <FiltersContext.Provider value={{ type, year, filterByType, filterByYear }}>
      {/* Definition of application routing */}
      <BrowserRouter>
        <Routes>
          <Route path={routes.home.path} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.search.path} element={<Search />} />
            <Route
              path={routes.movie_details.path(":imdbID")}
              element={<MovieDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </FiltersContext.Provider>
  );
}

export default App;
