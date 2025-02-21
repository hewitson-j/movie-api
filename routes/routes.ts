import express from "express";
import {
  handleGetMovieById,
  handleGetTrending,
  handleSearchMoviesByTitle,
} from "../controllers/getController";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(
    "Welcome to the Movie API! Use /movies/search, /movies/trending/tv, /movies/trending/movie, or /movies/search/:id to get started."
  );
});

router.get("/search", handleSearchMoviesByTitle);
router.get("/search/:id", handleGetMovieById);
router.get("/trending/:type", handleGetTrending);

export default router;
