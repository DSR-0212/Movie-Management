import Movie from "../models/movieShow.js";

export async function getAllMovies(_, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error in getAllMovies controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // console.log("getAllMovies");
  // res.status(200).json("getAllMovies");
}

export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie)
      return res.status(404).json({ message: "Movie not found" });
      res.status(200).json(movie);

  } catch (error) {
    console.error("Error in getMovieById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // console.log("getMovieById");
  // res.status(200).json("getMovieById");

}

 export async function addMovie(req, res) {
  try {
    const {MovieName,TheaterName,MovieTime,SeatAvailable,ShowStatus,Screen,MoviePrice} = req.body;
    if (!MovieName || !TheaterName || !MovieTime || !SeatAvailable || !Screen || !MoviePrice)
     {return res.status(400).json({ message: "All required fields must be filled" });
    }
    const existingMovie = await Movie.findOne({MovieName, TheaterName, MovieTime, Screen});
    if (existingMovie) 
    {
      return res.status(400).json({message: "Similar movie show already exists!"});
    }
    const movie = new Movie({MovieName, TheaterName, MovieTime, SeatAvailable, ShowStatus, Screen, MoviePrice});
    const savedMovie = await movie.save();
    res.status(200).json(savedMovie);
  } 
  catch (error) 
  {
    console.error("Error in addMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // console.log("addMovie");
  // res.status(200).json("addMovie");
}

export async function updateMovie(req, res) {
   try 
   {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found" });
      res.status(200).json(updatedMovie);
  } 
  catch (error) 
  {
    console.error("Error in updateMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
//   // console.log("updateMovie");
//   // res.status(200).json("updateMovie");
 }

export async function deleteMovie(req, res) {
   try 
   {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Movie not found" });
      res.status(200).json({ message: "Movie deleted successfully" });
  } 
  catch (error) 
  {
    console.error("Error in deleteMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
//   // console.log("deleteMovie");
//   // res.status(200).json("deleteMovie");
}