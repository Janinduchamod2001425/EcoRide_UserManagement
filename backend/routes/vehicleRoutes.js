import express from "express";
import {
  createVehicle,
  getVehiclesByOwner,
} from "../controllers/vehicleController.js";
import { protect, checkVehicleOwner } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new vehicle (POST /api/vehicles)
router.route("/newvehicle").post(protect, checkVehicleOwner, createVehicle);
router.get("/getowner/:ownerId", getVehiclesByOwner);

export default router;
