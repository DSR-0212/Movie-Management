import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    MovieName: "", TheaterName: "", SeatAvailable: "", Screen: "", MoviePrice: "", ShowStatus: "Active",
  });

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formattedTime = hour && minute && ampm ? `${hour}:${minute} ${ampm}` : "";
  if (
    !movie.MovieName.trim() || !movie.TheaterName.trim() || !formattedTime || !movie.SeatAvailable || !movie.Screen.trim() || !movie.MoviePrice
  ) {
    toast.error("All required fields must be filled");
    return;
  }
  try 
  {
    const res = await api.get("/movies");
    const movies = res.data;
    const duplicate = movies.find((m) =>
        m.MovieName === movie.MovieName && m.TheaterName === movie.TheaterName && m.MovieTime === formattedTime && m.Screen === movie.Screen
    );
    if (duplicate) {
      toast.error("Movie already exists");
      return;
    }
    await api.post("/movies", {
      ...movie,MovieTime: formattedTime,
    });
    toast.success("Movie added successfully");
    navigate("/");
  }
  catch (error)
  {
    toast.error("Failed to add movie");
  }
};
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-xl shadow-xl">
        <button
          className="btn btn-outline mb-4"
          onClick={() => navigate("/")}>
          Back
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">MovieName:</label>
            <input
              type="text" className="input input-bordered w-full" value={movie.MovieName}
              onChange={(e) => setMovie({ ...movie, MovieName: e.target.value })
              }/>
          </div>
          <div>
            <label className="label">TheaterName:</label>
            <input
              type="text" className="input input-bordered w-full" value={movie.TheaterName}
              onChange={(e) => setMovie({ ...movie, TheaterName: e.target.value })
              }/>
          </div>
          <div>
            <label className="label">MovieTime:</label>
            <div className="flex gap-2">
              <select
                className="select select-bordered"
                value={hour}onChange={(e) => setHour(e.target.value)}>
                <option value="">Hour</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered" value={minute}
                onChange={(e) => setMinute(e.target.value)}>
                <option value="">Min</option>
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={i < 10 ? `0${i}` : i}>
                    {i < 10 ? `0${i}` : i}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered"value={ampm}
                onChange={(e) => setAmpm(e.target.value)}>
                <option value="">AM/PM</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Seat Status:</label>
            <select
              className="select select-bordered w-full"
              value={movie.SeatAvailable}
              onChange={(e) => setMovie({ ...movie, SeatAvailable: e.target.value })
              }>
              <option value="">Select Seat Status</option>
              <option value="Available">Available</option>
              <option value="Almost Full">Almost Full</option>
              <option value="House Full">House Full</option>
            </select>
          </div>

          <div>
            <label className="label">Screen:</label>
            <input
              type="text" className="input input-bordered w-full" value={movie.Screen}
              onChange={(e) => setMovie({ ...movie, Screen: e.target.value })
              }/>
          </div>

          <div>
            <label className="label">MoviePrice:</label>
            <input type="number" className="input input-bordered w-full" value={movie.MoviePrice}
              onChange={(e) => setMovie({ ...movie, MoviePrice: e.target.value })
              }/>
          </div>

          <div>
            <label className="label">ShowStatus:</label>
            <select className="select select-bordered w-full" value={movie.ShowStatus}
              onChange={(e) => setMovie({ ...movie, ShowStatus: e.target.value })
              }>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;