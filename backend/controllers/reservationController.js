import asyncHandler from "express-async-handler";
import Reservation from "../models/reservationModel.js";

// @desc Create new reservation
// route POST/api/reservation
// @access Public
const createReservation = asyncHandler(async (req, res) => {
  const { cardtype, cardnumber, expiredate, cvv } = req.body;

  // Validate required fields
  if ( !cardtype || !cardnumber || !expiredate || !cvv) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate card number length
  if (cardnumber.length !== 16) {
    res.status(400);
    throw new Error("Card number should be 16 characters long");
  }

  // Validate CVV length
  if (cvv.length !== 3) {
    res.status(400);
    throw new Error("CVV should be 3 characters long");
  }

  const reservation = await Reservation.create({
    cardtype,
    cardnumber,
    expiredate,
    cvv,
  });

  if (reservation) {
    res.status(201).json({
      _id: reservation._id,
      cardtype: reservation.cardtype,
      cardnumber: reservation.cardnumber,
      expiredate: reservation.expiredate,
      cvv: reservation.cvv,
    });
  } else {
    res.status(400);
    throw new Error("Invalid card Details");
  }
});

export { createReservation };
