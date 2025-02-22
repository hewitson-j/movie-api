import axios from "axios";
import NodeCache from "node-cache";

const searchCache = new NodeCache({ stdTTL: 7200 });
const trendingCache = new NodeCache({ stdTTL: 43200 });

export const handleSearchByTitle = async (req, res) => {
  let { title, page, year, include_adult, language, region } = req.query;
  let { type } = req.params;

  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!type || (type !== "movie" && type !== "tv")) type = "movie";

  const cacheKey = `searchByTitle-${title}-${type}-${year || "any"}-${
    page || 1
  }-${language || "en"}-${region || "US"}-${include_adult || false}`;
  const cachedData = searchCache.get(cacheKey);

  if (cachedData) {
    console.log(`Serving from cache: ${cacheKey}`);
    return res.json(cachedData);
  }

  console.log("Fetching from API:", cacheKey);

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${type}`,
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

    searchCache.set(cacheKey, response.data);
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

  const cacheKey = `getMovieById-${id}`;
  const cachedData = searchCache.get(cacheKey);

  if (cachedData) {
    console.log(`Serving from cache: ${cacheKey}`);
    return res.json(cachedData);
  }

  console.log("Fetching from API:", cacheKey);

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );

    searchCache.set(cacheKey, response.data);
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

  const cacheKey = `getTvShowById-${id}`;
  const cachedData = searchCache.get(cacheKey);

  if (cachedData) {
    console.log(`Serving from cache: ${cacheKey}`);
    return res.json(cachedData);
  }

  console.log("Fetching from API:", cacheKey);

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: process.env.API_KEY,
      },
    });

    searchCache.set(cacheKey, response.data);
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

  const cacheKey = `getTrending-${type}-${timeframe}=${page}`;
  const cachedData = trendingCache.get(cacheKey);

  if (cachedData) {
    console.log(`Serving from cache: ${cacheKey}`);
    return res.json(cachedData);
  }

  console.log(`Requesting from API: ${cacheKey}`);

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

    trendingCache.set(cacheKey, response.data);
    return res.json(response.data);
  } catch (e) {
    return res.status(e.response?.status || 500).json({
      error: "Failed to fetch trending",
      details: e.response?.data || "Internal Server Error",
    });
  }
};
