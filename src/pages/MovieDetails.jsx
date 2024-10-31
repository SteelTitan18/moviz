import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetItemDetailsQuery } from "../redux/features/api/endpoints/omdbEndpoints";
import poster_illustration from "../assets/poster_illustration.png";
import Loader from "../components/Loader";
import types from "../utils/types";
import { Divider } from "@mui/material";
import Back from "../components/BackComponent";

export default function MovieDetails() {
  const imdb_id = useParams().imdbID;
  const [movie, setMovie] = useState({});
  const { data: movie_fetched, isLoading: isMovieLoading } =
    useGetItemDetailsQuery({
      imdbID: imdb_id,
    });

  useEffect(() => {
    if (!isMovieLoading) {
      if (movie_fetched.Response === "True") {
        console.log(movie_fetched);

        setMovie(movie_fetched);
      }
    }
  }, [isMovieLoading, movie_fetched]);

  if (isMovieLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-10">
      <Back />
      <div className="flex w-full">
        <div className="h-96 w-72 flex items-center justify-center overflow-hidden rounded-md bg-slate-800 mr-5">
          <img
            src={movie?.Poster !== "N/A" ? movie?.Poster : poster_illustration}
            alt="movie_poster"
            className="h-full object-cover"
          />
        </div>
        <div className="w-1/3 flex flex-col gap-5">
          <div className="flex gap-2">
            <span>Titre : </span>
            <span className="font-bold">{movie.Title}</span>
          </div>
          <div className="flex gap-2">
            <span>Type : </span>
            <span className="font-bold">
              {types.find((type) => type.value === movie.Type)?.name}
            </span>
          </div>
          <div className="flex gap-2">
            <span>Date de sortie : </span>
            <span className="font-bold">{movie.Released}</span>
          </div>
          <div className="flex gap-2">
            <span>Durée : </span>
            <span className="font-bold">{movie.Runtime}</span>
          </div>
          <div className="flex gap-2">
            <span>Directeur : </span>
            <span className="font-bold">{movie.Director}</span>
          </div>
          <div className="flex gap-2">
            <span>Rédacteur(s) : </span>
            <span className="font-bold">{movie.Writer}</span>
          </div>
          <div className="flex gap-2">
            <span>Langues disponibles : </span>
            <span className="font-bold">{movie.Language}</span>
          </div>
          <div className="flex gap-2">
            <span>Genres : </span>
            <span className="font-bold">{movie.Genre}</span>
          </div>
        </div>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "primary.light" }}
        />
        <div className="flex flex-col ml-5 gap-5">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Notes</span>
            {movie?.Ratings?.length > 0 ? (
              movie.Ratings.map((rating) => (
                <div className="flex gap-2">
                  <span className="underline">{rating.Source}</span>
                  <span className="font-bold"> : {rating.Value}</span>
                </div>
              ))
            ) : (
              <span>Aucune note disponible !</span>
            )}
          </div>
          <div className="flex gap-2">
            <span>Nominations : </span>
            <span className="font-bold">{movie.Awards}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Acteurs :</span>
            <span className="font-bold">{movie.Actors}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="text-xl font-bold">Résumé</div>
        <div>{movie.Plot}</div>
      </div>
    </div>
  );
}
