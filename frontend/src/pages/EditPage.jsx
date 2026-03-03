import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        toast.error("Failed to fetch movie");
      }
    };
    fetchMovie();
  }, [id]);

  const handleSave = async () => {
    try {
      await api.put(`/movies/${id}`, movie);
      toast.success("Updated successfully");
      navigate("/");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/movies/${id}`);
      toast.success("Deleted successfully");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-lg mx-auto space-y-4">

        {/* Movie Name */}
        <div>
          <label className="font-semibold">MovieName:</label>
          <input
            className="input input-bordered w-full"
            value={movie.MovieName}
            onChange={(e) =>
              setMovie({ ...movie, MovieName: e.target.value })
            }
          />
        </div>

        {/* Theater Name */}
        <div>
          <label className="font-semibold">TheaterName: </label>
          <input
            className="input input-bordered w-full"
            value={movie.TheaterName}
            onChange={(e) =>
              setMovie({ ...movie, TheaterName: e.target.value })
            }
          />
        </div>

        {/* Movie Time */}
        <div>
          <label className="font-semibold">MovieTime: </label>
          <input
            className="input input-bordered w-full"
            value={movie.MovieTime}
            onChange={(e) =>
              setMovie({ ...movie, MovieTime: e.target.value })
            }
          />
        </div>

        {/* Screen */}
        <div>
          <label className="font-semibold">Screen: </label>
          <input
            className="input input-bordered w-full"
            value={movie.Screen}
            onChange={(e) =>
              setMovie({ ...movie, Screen: e.target.value })
            }
          />
        </div>

        {/* Seat Available */}
        <div>
          <label className="font-semibold">SeatAvailable: </label>
          <select
            className="select select-bordered w-full"
            value={movie.SeatAvailable}
            onChange={(e) =>
              setMovie({ ...movie, SeatAvailable: e.target.value })
            }
          >
            <option value="Available">Available</option>
            <option value="Almost Full">Almost Full</option>
            <option value="House Full">House Full</option>
          </select>
        </div>

        {/* Movie Price */}
        <div>
          <label className="font-semibold">MoviePrice: </label>
          <input
            className="input input-bordered w-full"
            value={movie.MoviePrice}
            onChange={(e) =>
              setMovie({ ...movie, MoviePrice: e.target.value })
            }
          />
        </div>

        {/* Show Status */}
        <div>
          <label className="font-semibold">ShowStatus: </label>
          <select
            className="select select-bordered w-full"
            value={movie.ShowStatus}
            onChange={(e) =>
              setMovie({ ...movie, ShowStatus: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save Changes
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;