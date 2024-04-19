import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsersProfiles,
  getUser,
  createUserProfile,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/create", createUserProfile);
router.delete("/delete/:id", deleteUserProfile);
router.put("/update/:id", updateUser);
router.route("/getall").get(getAllUsersProfiles);
router.route("/getone/:id").get(getUser);


export default router;

// POST /api/users - Register a User
// POST /api/users/auth - Authenticate a User and get token
// POST /api/users/logout - Logout user and clear cookie
// GET /api/users/profile - Get user profile
// PUT /api/users/profile - Update profile
