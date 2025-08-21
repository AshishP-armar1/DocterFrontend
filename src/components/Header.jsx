import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-100 transition"
          >
            FastAPI Booking
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="flex space-x-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-100 transition"
          >
            Home
          </Link>

           <Link
            to="/book"
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
          >
            Book Slot
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

         
        </nav>
      </div>
    </header>
  );
}

export default Header;
