import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User } from "lucide-react";
import ProfilePopup from "./ProfilePopup"; 

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 shadow-lg fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white hover:opacity-90 transition"
        >
          <img
            src="https://i.pinimg.com/736x/ef/3a/76/ef3a766176ca373cdf0f2555f0642c53.jpg"
            alt="EventHandler Logo"
            className="h-12 w-12 object-cover rounded-full" 
          />
          <h1 className="text-2xl font-bold tracking-tight hidden md:block">
            EventHandler
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {authUser && (
            <>
              <button
                onClick={toggleProfilePopup}
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition"
              >
                <User className="w-6 h-6" />
                <span className="text-sm font-medium hidden sm:inline">
                  Profile
                </span>
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-sm font-medium hidden sm:inline">
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Profile Popup */}
      {isProfilePopupOpen && <ProfilePopup onClose={toggleProfilePopup} />}
    </header>
  );
};

export default Navbar;
