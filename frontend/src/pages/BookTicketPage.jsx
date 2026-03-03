import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const BookTicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try 
      {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } 
      catch 
      {
        toast.error("Failed to fetch movie");
      }
    };
    fetchMovie();
  }, [id]);

  const handleBooking = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const newTicket = {movieId: movie._id, movieName: movie.MovieName, customerName: name, theater: movie.TheaterName, time: movie.MovieTime, screen: movie.Screen, price: movie.MoviePrice,
      ticketId: "TKT-" + Math.floor(100000 + Math.random() * 900000),
    };
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    localStorage.setItem("tickets", JSON.stringify([...storedTickets, newTicket]));
    toast.success("Ticket booked successfully ");
    navigate("/my-tickets");
  };

  if (!movie) return null;
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Book Ticket</h2>

        <p><strong>Movie:</strong> {movie.MovieName}</p>
        <p><strong>Theater:</strong> {movie.TheaterName}</p>
        <p><strong>Time:</strong> {movie.MovieTime}</p>
        <p><strong>Price:</strong> Rs.{movie.MoviePrice}</p>

        <div className="mt-4">
          <label className="font-semibold">Enter Your Name: </label>
          <input type="text" className="input input-bordered w-full mt-2" 
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </div>

        <button
          className="btn btn-primary w-full mt-4" onClick={handleBooking}>
          Confirm Booking
        </button>

        <button
          className="btn btn-outline w-full mt-2" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default BookTicketPage;