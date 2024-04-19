import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicleModel.js";
import User from "../models/userModel.js";

// @desc Create a new vehicle
// @route POST /api/vehicles
// @access Private (for vehicle owners)
const createVehicle = asyncHandler(async (req, res) => {
  const { license, model, year } = req.body;

  // Retrieve authenticated user's ID from req.user
  const userId = req.user._id;

  // Check if the user ID is valid
  if (!userId) {
    res.status(401);
    throw new Error("User not authorized or user ID missing");
  }

  // Create a new vehicle associated with the authenticated user
  const vehicle = await Vehicle.create({
    license,
    model,
    year,
    owner: userId, // Set the owner to the authenticated user's ID
  });

  // Check if the vehicle was created successfully
  if (vehicle) {
    res.status(201).json(vehicle);
  } else {
    res.status(400);
    throw new Error("Failed to add new vehicle");
  }
});

// Get Vehicles by the Owner Id
const getVehiclesByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.params.ownerId; // Get ownerId from request parameters

  // Find vehicles with the specified owner ID
  const vehicles = await Vehicle.find({ owner: ownerId });

  if (vehicles) {
    res.status(200).json(vehicles); // Return list of vehicles as JSON response
  } else {
    res.status(404);
    throw new Error("Vehicles not found for the specified owner");
  }
});

export { createVehicle, getVehiclesByOwner };
