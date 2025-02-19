import express from "express";
import {
  handleGetMovieById,
  handleSearchMoviesByTitle,
} from "../controllers/getController";

const router = express.Router();

router.get("/test", (_, res) => {
  return res.send("Hello! This is a test.");
});

router.get("/search", handleSearchMoviesByTitle);
router.get("/search/:id", handleGetMovieById);

export default router;
