import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  //  Load theme from localStorage
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "retro");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); 
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "retro" ? "dark" : "retro"));
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          MOVIE MANAGEMENT SYSTEM
        </Link>
      </div>

      <div className="flex gap-3">
        <Link to="/create" className="btn btn-primary btn-sm">New Movie</Link>
        <Link to="/upcoming" className="btn btn-outline btn-sm">Upcoming Movies</Link>
        <Link to="/my-tickets" className="btn btn-outline btn-sm">My Tickets</Link>

        <button
          onClick={toggleTheme}
          className="btn btn-outline btn-sm">
          {theme === "retro" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;