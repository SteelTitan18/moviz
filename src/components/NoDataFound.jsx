import no_movies from "../assets/no_data_found.png";
export default function NoDataFound({ query }) {
  return (
    <div className="flex flex-col items-center justify-center font-bold text-xl h-full">
      <img src={no_movies} alt="no_movies" className="p-2 h-96" />
      Aucune donnée trouvée pour "{query}"
    </div>
  );
}
