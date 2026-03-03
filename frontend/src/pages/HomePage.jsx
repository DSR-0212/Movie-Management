import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [screenFilter, setScreenFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try 
      {
        const res = await api.get("/movies");
        setMovies(res.data);
      } 
      catch (error) 
      {
        toast.error("Failed to load movies");
      } 
      finally 
      {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Unique Screens
 const uniqueScreens = useMemo(() => {
  const screens = movies.flatMap((m) =>
    m.Screen.split(/(?=Screen)/)
  );
  return ["All", ...new Set(screens)];
}, [movies]);

  // Convert 12hr time to minutes for correct sorting
  const convertToMinutes = (time) => {
    if (!time) return 0;

    const [t, modifier] = time.split(" ");
    let [hours, minutes] = t.split(":");

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === "PM" && hours !== 12) 
    {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) 
    {
      hours = 0;
    }
    return hours * 60 + minutes;
  };

  // Filter + Search + Sort
  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    // Search
    if (search) 
    {
      filtered = filtered.filter((movie) =>
        movie.MovieName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Screen Filter
    if (screenFilter !== "All") 
    {
      filtered = filtered.filter(
        (movie) => movie.Screen === screenFilter
      );
    }

    // Active Only
    if (showActiveOnly) 
    {
      filtered = filtered.filter(
        (movie) => movie.ShowStatus === "Active"
      );
    }

    // Sort by Time 
    filtered.sort((a, b) => {
      const timeA = convertToMinutes(a.MovieTime);
      const timeB = convertToMinutes(b.MovieTime);

      return sortAsc ? timeA - timeB : timeB - timeA;
    });

    return filtered;
  }, [movies, search, screenFilter, sortAsc, showActiveOnly]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* FILTER SECTION */}
        <div className="flex flex-wrap gap-4 mb-6">

          {/* Search */}
          <input type="text" placeholder="Search by movie name" className="input input-bordered"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>

          {/* Screen Filter */}
          <select 
          className="select select-bordered" 
          value={screenFilter}
          onChange={(e) => 
          setScreenFilter(e.target.value)}>
          {uniqueScreens.map((screen, index) => (
              <option key={index} value={screen}>
                {screen === "All" ? "All Screens" : screen}
              </option>
            ))}
          </select>

          {/* Sort Button */}
          <button onClick={() => setSortAsc(!sortAsc)}
            className="btn btn-outline">
            Sort by Time 
          </button>

          {/* Active Only Toggle */}
          <button onClick={() => setShowActiveOnly(!showActiveOnly)}
            className="btn btn-outline">
            {showActiveOnly ? "Showing Active" : "Show Active Only"}
          </button>
        </div>

        {/* MOVIES GRID */}
        {loading ? (
          <div className="text-center py-10">
            Loading movies...
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-10">
            No movies found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                setMovies={setMovies}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;