import express from "express";
import {
  handleGetMovieById,
  handleGetTrending,
  handleGetTvShowById,
  handleSearchMoviesByTitle,
} from "../controllers/getController";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(
    "Welcome to the Movie API! Use /movies/search, /movies/trending/tv, /movies/trending/movie, /movies/search/tv/:id, or /movies/search/movie/:id to get started."
  );
});

router.get("/search", handleSearchMoviesByTitle);
router.get("/search/movie/:id", handleGetMovieById);
router.get("/search/tv/:id", handleGetTvShowById);
router.get("/trending/:type", handleGetTrending);

export default router;
