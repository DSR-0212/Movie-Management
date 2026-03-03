import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router";

const UpcomingPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await api.get("/movies");
      const upcoming = res.data.filter((m) => m.ShowStatus === "Upcoming");
      setMovies(upcoming);
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">

      {/* BACK BUTTON */}
      <button
        className="btn btn-outline mb-6" onClick={() => navigate("/")}>
         Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Upcoming Movies</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie}
           setMovies={setMovies}/>
        ))}
      </div>
    </div>
  );
};
export default UpcomingPage;