import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../redux/features/api/endpoints/omdbEndpoints";
import { Pagination, Stack } from "@mui/material";
import { FiltersContext } from "../App";
import MovieDisplay from "../components/MovieDisplay";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { type, year } = useContext(FiltersContext);

  // call of search request with existing filters and page
  const { data: movies_fetched, isLoading: isMoviesLoading } = useSearchQuery({
    query: query,
    page: page,
    type: type,
    year: year,
  });

  // this hooks allows the request to be called on filters or page change
  useEffect(() => {
    if (!isMoviesLoading) {
      if (movies_fetched?.Response === "True") {
        setMovies(movies_fetched.Search);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMovies, isMoviesLoading, page, year, type, movies_fetched]);

  // If movies are loading, display the Loader
  if (isMoviesLoading) {
    return <Loader />;
  }

  return movies_fetched?.Response === "True" ? (
    <div className="flex flex-col py-10 gap-5 overflow-y-auto">
      <span className="text-lg">
        Résultats pour "{query}" : ({movies_fetched?.totalResults} résultat(s))
      </span>
      {/* grid view of results */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
        {movies.map((movie) => (
          <MovieDisplay movie={movie} />
        ))}
      </div>
      {/* Pagination componant */}
      <Stack spacing={2} className="self-center bg-slate-400">
        <Pagination
          count={Math.ceil(movies_fetched?.totalResults / 10)}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </div>
  ) : (
    //   Componant to display if there is no corresponding data
    <NoDataFound query={query} />
  );
}
