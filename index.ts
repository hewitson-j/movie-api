import express from "express";
import rateLimit from "express-rate-limit";
import router from "./routes/routes";

require("dotenv").config();

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again in a few minutes." },
  headers: true,
});

app.use(limiter);
app.use("/movies", router);

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}...`)
);

process.on("SIGINT", () => {
  console.log("Server closing gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
