import express from "express";

import {
  addMovie,deleteMovie,getAllMovies,getMovieById,updateMovie} from "../controllers/movieController.js";

const router = express.Router();
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
