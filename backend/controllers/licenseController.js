import asyncHandler from "express-async-handler";
import License from "../models/licenseModel.js";

// @desc Add new license
// route POST/api/license
// @access Public
const createLicense = asyncHandler(async (req, res) => {
  const {
    name,
    nic,
    address,
    dateofbirth,
    issuedate,
    expiredate,
    bloodgroup,
    licensevehicle,
  } = req.body;

  const userId = req.user._id;

  const licenseExist = await License.findOne({ nic });

  // Validate if the user already registered
  if (licenseExist) {
    res.status(400);
    throw new Error("License already exists");
  }

  // Check if the user ID is valid
  if (!userId) {
    res.status(401);
    throw new Error("User not authorized or user ID missing");
  }

  // Validate required fields
  if (
    !name ||
    !nic ||
    !address ||
    !dateofbirth ||
    !issuedate ||
    !expiredate ||
    !bloodgroup ||
    !licensevehicle
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate nic number length
  if (nic.length !== 12) {
    res.status(400);
    throw new Error("NIC number should be 12 characters long");
  }

  const license = await License.create({
    name,
    nic,
    address,
    dateofbirth,
    issuedate,
    expiredate,
    bloodgroup,
    licensevehicle,
    driver: userId,
  });

  if (license) {
    res.status(201).json({
      _id: license._id,
      name: license.name,
      nic: license.nic,
      address: license.address,
      dateofbirth: license.dateofbirth,
      issuedate: license.issuedate,
      expiredate: license.expiredate,
      bloodgroup: license.bloodgroup,
      licensevehicle: license.licensevehicle,
      driver: license.driver,
    });
  } else {
    res.status(400);
    throw new Error("Invalid License Details");
  }
});

// Get License by driver Id
const getLicenseByDriver = asyncHandler(async (req, res) => {
  const driverId = req.params.driverId; // Get Driver ID from request parameters

  // Find the License with the specified driver
  const license = await License.find({ driver: driverId });

  if (license) {
    res.status(200).json(license);
  } else {
    res.status(404);
    throw new Error("Couldn't find License");
  }
});

export { createLicense, getLicenseByDriver };
