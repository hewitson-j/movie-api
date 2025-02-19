import axios from "axios";

export const handleSearchMoviesByTitle = async (req, res) => {
  let { title, page, year, include_adult, language, region } = req.query;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query: title,
          page: page,
          include_adult: include_adult,
          year: year,
          language: language,
          region: region,
          api_key: process.env.API_KEY,
        },
      }
    );

    return res.json(response.data);
  } catch (e) {
    return res.status(e.response?.status || 500).json({
      error: "Failed to fetch search results",
      details: e.response?.data || "Internal Server Error",
    });
  }
};

export const handleGetMovieById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Movie ID is required" });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );

    return res.json(response.data);
  } catch (e) {
    return res.status(e.response?.status || 500).json({
      error: "Failed to fetch movie",
      details: e.response?.data || "Internal Server Error",
    });
  }
};
