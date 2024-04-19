import express from 'express';
import { createPackage } from '../controllers/packageController.js';
const router = express.Router();

router.post("/create", createPackage);

export default router;