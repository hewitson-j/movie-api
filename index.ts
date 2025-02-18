const express = require("express");
const axios = require("axios");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (_, res) => {
  return res.send("Hello world! This is a test endpoint...");
});

app.get("/search", async (req, res) => {
  const { title } = req.query;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query: title,
          api_key: process.env.API_KEY,
        },
      }
    );

    return res.send(response.data);
  } catch (e) {
    return res.send(e);
  }
});

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
