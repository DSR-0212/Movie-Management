import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import { Search, ArrowUpDown } from "lucide-react";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // FETCH MOVIE
  useEffect(() => {
    const fetchMovie = async () => {
      try 
      {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } 
      catch (error) 
      {
        console.error("Error fetching movie", error);
        toast.error("Failed to fetch movie");
      } 
      finally 
      {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // DELETE MOVIE
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?"))
      return;

    try 
    {
      await api.delete(`/movies/${id}`);
      toast.success("Movie deleted successfully");
      navigate("/");
    } 
    catch (error) 
    {
      console.error("Error deleting movie", error);
      toast.error("Failed to delete movie");
    }
  };

  // UPDATE MOVIE
  const handleSave = async () => {
    if (!movie.movieName.trim() || !movie.theaterName.trim()) {
      toast.error("Please fill required fields");
      return;
    }
    setSaving(true);
    try 
    {
      await api.put(`/movies/${id}`, {MovieName: movie.MovieName, 
        TheaterName: movie.TheaterName,
        MovieTime: movie.MovieTime,
        SeatAvailable: Number(movie.SeatAvailable),
        Screen: movie.Screen,
        MoviePrice: Number(movie.MoviePrice),
        ShowStatus: movie.ShowStatus});
      toast.success("Movie updated successfully");
      navigate("/");
    } 
    catch (error) 
    {
      console.error("Error updating movie", error);
      toast.error("Failed to update movie");
    } 
    finally 
    {
      setSaving(false);
    }
  };

  // LOADING UI
  if (loading) 
  {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Movies
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Movie
            </button>
          </div>

          {/* FORM CARD */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              {/* MOVIE NAME */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Movie Name</span>
                </label>
                <input type="text" className="input input-bordered" value={movie.MovieName}
                  onChange={(e) => setMovie({movie, MovieName: e.target.value })
                  }/>
              </div>

              {/* THEATER NAME */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Theater Name</span>
                </label>
                <input type="text" className="input input-bordered" value={movie.TheaterName}
                  onChange={(e) => setMovie({movie, TheaterName: e.target.value })
                  }/>
              </div>

              {/* MOVIE TIME */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Movie Time</span>
                </label>
                <input type="text" className="input input-bordered" value={movie.movieTime}
                  onChange={(e) => setMovie({movie, movieTime: e.target.value })
                  }/>
              </div>

              {/* SCREEN */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Screen</span>
                </label>
                <input type="text" className="input input-bordered" value={movie.Screen}
                  onChange={(e) => setMovie({movie, Screen: e.target.value })
                  }/>
              </div>

              {/* SEATS */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Seat Available</span>
                </label>
                <input type="number" className="input input-bordered" value={movie.SeatAvailable}
                  onChange={(e) => setMovie({movie, SeatAvailable: e.target.value })
                  }/>
              </div>

              {/* PRICE */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Movie Price</span>
                </label>
                <input type="number" className="input input-bordered" value={movie.MoviePrice}
                  onChange={(e) => setMovie({movie, MoviePrice: e.target.value })
                  }/>
              </div>

              {/* STATUS */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Show Status</span>
                </label>
                <select className="select select-bordered" value={movie.ShowStatus}
                  onChange={(e) => setMovie({movie, ShowStatus: e.target.value })
                  }>
                  <option>Available</option>
                  <option>Housefull</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* ACTION */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving}
                  onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetailPage;