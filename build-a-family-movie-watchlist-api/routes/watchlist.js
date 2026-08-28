import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  addMovie,
  deleteMovie,
  getWatchlist,
  updateMovie,
} from "../utils/db.js";

const router = express.Router();

router.use(authenticate);

// GET /api/watchlist/:userId
// Any authenticated user can view any watchlist.
router.get("/:userId", async (req, res) => {
  try {
    // TODO: use the actual DB function from utils/db.js
    const watchlist = await getWatchlist(req.params.userId);

    return res.status(200).json(watchlist);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// POST /api/watchlist/:userId/movies
router.post(
  "/:userId/movies",
  authorizeModification,
  async (req, res) => {
    try {
      // TODO: use the actual DB function from utils/db.js
      const movie = await addMovie(
        req.params.userId,
        req.body
      );

      return res.status(201).json(movie);
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }
);

// PUT /api/watchlist/:userId/movies/:movieId
router.put(
  "/:userId/movies/:movieId",
  authorizeModification,
  async (req, res) => {
    try {
      // TODO: use the actual DB function from utils/db.js
      const movie = await updateMovie(
        req.params.userId,
        req.params.movieId,
        req.body
      );

      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }
);

// DELETE /api/watchlist/:userId/movies/:movieId
router.delete(
  "/:userId/movies/:movieId",
  authorizeModification,
  async (req, res) => {
    try {
      // TODO: use the actual DB function from utils/db.js
      const result = await deleteMovie(
        req.params.userId,
        req.params.movieId
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }
);

export default router;
