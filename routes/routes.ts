import express from "express";
import { handleSearchMoviesByTitle } from "../controllers/getController";

const router = express.Router();

router.get("/test", (_, res) => {
  return res.send("Hello! This is a test.");
});

router.get("/search", handleSearchMoviesByTitle);

export default router;
