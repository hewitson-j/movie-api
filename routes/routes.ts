import express from "express";
import {
  handleGetMovieById,
  handleGetTrending,
  handleSearchMoviesByTitle,
} from "../controllers/getController";

const router = express.Router();

router.get("/test", (_, res) => {
  return res.send("Hello! This is a test.");
});

router.get("/search", handleSearchMoviesByTitle);
router.get("/search/:id", handleGetMovieById);
router.get("/trending/:type", handleGetTrending);

export default router;
