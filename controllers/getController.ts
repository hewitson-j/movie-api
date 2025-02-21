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

export const handleGetTvShowById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Show ID is required" });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: process.env.API_KEY,
      },
    });

    return res.json(response.data);
  } catch (e) {
    return res.status(e.response?.status || 500).json({
      error: "Failed to fetch TV show",
      details: e.response?.data || "Internal Server Error",
    });
  }
};

export const handleGetTrending = async (req, res) => {
  let { type } = req.params;
  let { timeframe, page } = req.query;

  if (!type || (type !== "movie" && type !== "tv")) type = "movie";
  if (!timeframe || (timeframe !== "day" && timeframe !== "week")) {
    return res.status(400).json({
      error: "Invalid or missing 'timeframe' parameter. Use 'day' or 'week'.",
    });
  }
  if (isNaN(page) || page < 0) page = 1;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/${timeframe}`,
      {
        params: {
          api_key: process.env.API_KEY,
          page: page,
        },
      }
    );

    return res.json(response.data);
  } catch (e) {
    return res.status(e.response?.status || 500).json({
      error: "Failed to fetch trending",
      details: e.response?.data || "Internal Server Error",
    });
  }
};
