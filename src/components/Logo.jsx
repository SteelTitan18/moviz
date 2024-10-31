import { Link } from "react-router-dom";
import { routes } from "../utils/routes";
import logo from "../assets/logo.png";

export default function Logo() {
  return (
    <div className="flex gap-2 italic">
      <Link
        to={routes.home.path}
        className="flex items-center text-7xl font-bold"
      >
        <img src={logo} alt="logo" className="p-2 size-32" />
        Moviz
      </Link>
    </div>
  );
}
