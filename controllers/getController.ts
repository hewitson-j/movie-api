import axios from "axios";

export const handleSearchMoviesByTitle = async (req, res) => {
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
};
