import React, { useState } from "react";
import { Info, Edit2, Trash2, Play } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const MovieCard = ({ movie, setMovies }) => {
const navigate = useNavigate();
const [showModal, setShowModal] = useState(false);

const handleDelete = async (e) => {e.stopPropagation();
  try 
  {
    await api.delete(`/movies/${movie._id}`);
    setMovies((prev) => prev.filter((m) => m._id !== movie._id));

    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const updatedTickets = storedTickets.filter(
      (ticket) => ticket.movieId !== movie._id
    );
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    toast.success("Movie deleted successfully");
  } 
  catch 
  {
    toast.error("Failed to delete movie");
  }
};

  const trailerSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    movie.MovieName + " official trailer")}`;
  return (
    <>
      <div
        onClick={() => navigate(`/edit/${movie._id}`)}
        className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-105 border border-red-900 bg-blue/30 dark:bg-black/70 shadow-[0_0_35px_rgba(190,24,93,0.7)]">
          
        {/* Poster Background Image */}
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
          alt="poster"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"/>

        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-20">
          {movie.ShowStatus === "Active" && (
            <span className="badge badge-success shadow-lg">Active</span>
          )}
          {movie.ShowStatus === "Inactive" && (
            <span className="badge badge-error shadow-lg">Inactive</span>
          )}
          {movie.ShowStatus === "Upcoming" && (
            <span className="badge badge-warning shadow-lg">Coming Soon</span>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
          <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-md">
            {movie.MovieName}
          </h2>

          <p className="text-sm opacity-90">
            {movie.TheaterName}
          </p>

          <p className="text-sm font-semibold">
            {movie.MovieTime}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={(e) => {e.stopPropagation();
                setShowModal(true);
              }}
              className="hover:text-cyan-300 transition">
              <Info size={18} />
            </button>
            <a
              href={trailerSearchUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="btn btn-sm bg-red-400 text-black hover:bg-green-400">
              <Play size={18} />
            </a>

            <button
              onClick={(e) => {e.stopPropagation();
                navigate(`/book/${movie._id}`);
              }}
              className="btn btn-sm bg-green-500 text-white hover:bg-red-700">Book Ticket
            </button>

            <button
              onClick={(e) => {e.stopPropagation();
                navigate(`/edit/${movie._id}`);
              }}
              className="hover:text-yellow-300 transition">
              <Edit2 size={18} />
            </button>

            <button
              onClick={handleDelete}
              className="hover:text-red-400 transition">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {movie.MovieName}
            </h3>

            <p><strong>Theater:</strong> {movie.TheaterName}</p>
            <p><strong>Time:</strong> {movie.MovieTime}</p>
            <p><strong>Screen:</strong> {movie.Screen}</p>
            <p><strong>Seats:</strong> {movie.SeatAvailable}</p>
            <p><strong>Price:</strong> Rs.{movie.MoviePrice}</p>
            <p><strong>Status:</strong> {movie.ShowStatus}</p>

            <div className="modal-action">
              <button
                className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default MovieCard;