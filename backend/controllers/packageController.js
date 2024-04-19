import asyncHandler from "express-async-handler";
import Package from "../models/packageModel.js";

const createPackage = asyncHandler(async (req, res) => {
  const { packname, description, vehicletype, duration, price } = req.body;

  // const packageExists = await Package.findOne({ packname });

  // if (packageExists) {
  //   res.status(400);
  //   throw new Error("Package already exists");
  // }

  const pack = await Package.create({
    packname,
    description,
    vehicletype,
    duration,
    price,
  });

  if (pack) {
    res.status(201).json({
      _id: pack._id,
      packname: pack.packname,
      description: pack.description,
      vehicletype: pack.vehicletype,
      duration: pack.duration,
      price: pack.price,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Package data");
  }
});

export {
    createPackage
};