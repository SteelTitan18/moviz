import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  // Layout with gradient background color
  return (
    <div className="bg-gradient-to-b from-blue-950 to-black min-h-screen overflow-hidden flex flex-col">
      <div className="w-full h-full">
        <Header />
        <div className="mt-40 w-[70%] mx-auto h-full overflow-y-auto flex-grow py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
