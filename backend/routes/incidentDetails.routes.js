// module.exports = (app) => {
import express from "express";
// const incidentDetails = require("../controllers/incidentDetail.controller.js");
import {
  create,
  findAll,
  findOne,
  findAllByUserId,
  update,
  deleteIncidentReport,
  patchUpdate,
} from "../controllers/incidentDetail.controller.js";

// var router = require("express").Router();
const router = express.Router();

// Create a new incident details
router.post("/", create);

// // Retrieve all incident details
router.get("/", findAll);

// // Retrieve a single incident details with id
router.get("/:id", findOne);

router.get("/findbyuserid/:id", findAllByUserId);

// // Update a incident details with id
router.put("/:id", update);

// // Delete a incident details with id
router.delete("/:id", deleteIncidentReport);

//patch
router.patch("/:id", patchUpdate);

// // Delete all incident details
// router.delete("/", incidentDetails.deleteAll);
// };
export default router;
