import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../redux/features/api/endpoints/omdbEndpoints";
import { Pagination, Stack } from "@mui/material";
import { FiltersContext } from "../App";
import MovieDisplay from "../components/MovieDisplay";
import Loader from "../components/Loader";
import no_movies from "../assets/no_data_found.png";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { type, year } = useContext(FiltersContext);

  const { data: movies_fetched, isLoading: isMoviesLoading } = useSearchQuery({
    query: query,
    page: page,
    type: type,
    year: year,
  });

  console.log(movies.length);

  useEffect(() => {
    if (!isMoviesLoading) {
      if (movies_fetched?.Response === "True") {
        setMovies(movies_fetched.Search);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMovies, isMoviesLoading, page, year, type, movies_fetched]);

  /*  useEffect(
    function () {
      let filter_movies = movies_fetched?.Search;
      if (type) {
        filter_movies = filter_movies.filter((movie) => movie.Type === type);
        setMovies(filter_movies);
      }
      if (year) {
        const start_year = year[0];
        if (start_year !== 2020) {
          const end_year = year[1];
          console.log(end_year);

          filter_movies = filter_movies.filter(
            (movie) => Number(movie.Year) < end_year
          );
        }
        filter_movies = filter_movies.filter(
          (movie) => Number(movie.Year) >= start_year
        );
        console.log(filter_movies);

        setMovies(filter_movies);
      }
    },
    [type, year, movies_fetched]
  ); */

  if (isMoviesLoading) {
    return <Loader />;
  }

  return movies_fetched?.Response === "True" ? (
    <div className="flex flex-col py-10 gap-5 overflow-y-auto">
      <span className="text-lg">
        Résultats pour "{query}" : ({movies_fetched?.totalResults} résultat(s))
      </span>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
        {movies.map((movie) => (
          <MovieDisplay movie={movie} />
        ))}
      </div>
      <Stack spacing={2} className="self-center bg-slate-400">
        <Pagination
          count={Math.ceil(movies_fetched?.totalResults / 10)}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center font-bold text-xl h-full">
      <img src={no_movies} alt="no_movies" className="p-2 h-96" />
      Aucune donnée trouvée pour "{query}"
    </div>
  );
}
