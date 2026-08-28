import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { findByUsername } from "../utils/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Missing username or password
  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required."
    });
  }

  // Find user
  const user = findByUsername(username);

  if (!user) {
    return res.status(401).json({
      error: "Invalid credentials."
    });
  }

  // Check password
  let passwordIsValid;

  try {
    passwordIsValid = await bcrypt.compare(password, user.passwordHash);
  } catch (error) {
    passwordIsValid = false;
  }

  if (!passwordIsValid) {
    return res.status(401).json({
      error: "Invalid credentials."
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  return res.status(200).json({
    token
  });
});

export default router;
