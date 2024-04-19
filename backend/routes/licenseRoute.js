import express from "express";
import {
  createLicense,
  getLicenseByDriver,
} from "../controllers/licenseController.js";
import { protect, checkDriver } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/addlicense").post(protect, checkDriver, createLicense);
router.get("/getlicense/:driverId", getLicenseByDriver);

export default router;
