import express from "express"
import jwt from "jsonwebtoken"
import { login, logout, register } from "../controller/userAuth.Controller.js";
const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// Refetch User
router.get("/refetch", authenticateToken, (req, res) => {
  // console.log(req)
  res.status(200).json(req.user); // req.user contains user data from JWT payload
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

export default router;