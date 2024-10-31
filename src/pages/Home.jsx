import movie_illustration from "../assets/movie_illustration.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-bold text-xl h-full">
      <img
        src={movie_illustration}
        alt="movie illustration"
        className="p-2 h-[600px] flex items-center"
      />
      <div className="flex">
        Bienvenue sur <b className="text-2xl italic ">Moviz</b>. Explorez un
        monde de divertissement : trouvez le film ou la série parfaite qui vous
        attend !
      </div>
    </div>
  );
}
