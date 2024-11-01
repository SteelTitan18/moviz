import { Link } from "react-router-dom";
import { routes } from "../utils/routes";
import poster_illustration from "../assets/poster_illustration.png";

export default function MovieDisplay({ movie }) {
  return (
    <Link to={routes.movie_details.path(movie.imdbID)}>
      <div
        key={movie.imdbID}
        className="flex flex-col h-72 w-52 items-center bg-slate-900 p-2 rounded-md shadow-lg"
      >
        <div className="h-52 w-full flex items-center justify-center overflow-hidden rounded-md bg-slate-800">
          <img
            src={movie?.Poster !== "N/A" ? movie?.Poster : poster_illustration} // A standard illustration if there is no poster
            alt="movie_poster"
            className="h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between items-start w-full mt-2">
          <div className="flex justify-between items-center w-full">
            <p className="text-white font-semibold text-sm truncate">
              {movie?.Title}
            </p>
            <span className="text-gray-400 text-xs uppercase">
              {movie?.Type}
            </span>
          </div>
          <p className="self-end text-gray-400 text-xs mt-1">{movie?.Year}</p>
        </div>
      </div>
    </Link>
  );
}
