import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-gray-100 to-green-500 text-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-800 hover:opacity-90 transition"
        >
          <div className="w-10 h-10 rounded-box bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">C</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            ClickTalk
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/settings"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
