import React from "react";

const MovieDetailsModal = ({ movie, onClose }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{movie.MovieName}</h3>

        <div className="space-y-2 text-sm">
          <p><strong>Theater:</strong> {movie.TheaterName}</p>
          <p><strong>Time:</strong> {movie.MovieTime}</p>
          <p><strong>Screen:</strong> {movie.Screen}</p>
          <p><strong>Seats:</strong> {movie.SeatAvailable}</p>
          <p><strong>Price:</strong> Rs.{movie.MoviePrice}</p>
          <p><strong>Status:</strong> {movie.ShowStatus}</p>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
};
export default MovieDetailsModal;