import express from "express";
import axios from "axios";
import router from "./routes/routes";

require("dotenv").config();

const app = express();

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
