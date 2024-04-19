import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// check if the user is a vehicle owner
const checkVehicleOwner = (req, res, next) => {
  try {
    // Check if req.user exists and has the 'role' property
    if (!req.user || !req.user.role) {
      throw new Error("User role not defined");
    }

    // Retrieve user role from req.user
    const userRole = req.user.role;

    // Ensure user role is exactly "Vehicle Owner" (case-sensitive)
    if (userRole !== "Vehicle Owner") {
      res.status(403);
      throw new Error("Only vehicle owners are authorized to add vehicles");
    }

    // If user is a vehicle owner, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors by passing them to the Express error handler
    next(error);
  }
};

// check if the user is a vehicle owner
const checkDriver = (req, res, next) => {
  try {
    // Check if req.user exists and has the 'role' property
    if (!req.user || !req.user.role) {
      throw new Error("User role not defined");
    }

    // Retrieve user role from req.user
    const userRole = req.user.role;

    // Ensure user role is exactly "Vehicle Owner" (case-sensitive)
    if (userRole !== "Driver") {
      res.status(403);
      throw new Error("Only Drivers are authorized to add License");
    }

    // If user is a driver, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors by passing them to the Express error handler
    next(error);
  }
};

export { protect, checkVehicleOwner, checkDriver };
