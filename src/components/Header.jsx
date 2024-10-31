import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="flex justify-between px-8 w-screen items-center border-b border-gray-600 z-50 bg-blue-950 fixed top-0 h-40">
      <Logo />
      <SearchBar />
    </div>
  );
}
