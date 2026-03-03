import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios";

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTickets = async () => {
      const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

      try 
      {
        const res = await api.get("/movies");
        const existingMovies = res.data;

        // Keep only tickets whose movie still exists
        const validTickets = storedTickets.filter((ticket) =>
          existingMovies.some((movie) => movie._id === ticket.movieId));

        // Update localStorage automatically
        localStorage.setItem("tickets",JSON.stringify(validTickets));
        setTickets(validTickets);
      } 
      catch (error) 
      {
        console.error("Error loading movies");
      }
    };
    loadTickets();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <button className="btn btn-outline mb-6" onClick={() => navigate("/")}>
        Back
      </button>

      <h2 className="text-2xl font-bold text-center mb-6">
        My Booked Tickets
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-red-600 to-pink-500 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-2">{ticket.movieName}</h3>

            <p><strong>Name:</strong> {ticket.customerName}</p>
            <p><strong>Theater:</strong> {ticket.theater}</p>
            <p><strong>Time:</strong> {ticket.time}</p>
            <p><strong>Screen:</strong> {ticket.screen}</p>
            <p><strong>Price:</strong> Rs. {ticket.price}</p>

            <hr className="my-3 border-white/30" />

            <p>Ticket ID: {ticket.ticketId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTicketsPage;