import React from "react";
import { Film } from "lucide-react";
import { Link } from "react-router";

const MovieNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">

      {/* ICON CIRCLE */}
      <div className="bg-primary/10 rounded-full p-8">
        <Film className="size-10 text-primary" />
      </div>

      {/* TITLE */}
      <h3 className="text-2xl font-bold">No Movies Yet</h3>

      {/* DESCRIPTION */}
      <p className="text-base-content/70">
        Ready to add movies? Add your first movie to the system.
      </p>

      {/* BUTTON */}
      <Link to="/create" className="btn btn-primary">
        Add First Movie
      </Link>
    </div>
  );
};
export default MovieNotFound;