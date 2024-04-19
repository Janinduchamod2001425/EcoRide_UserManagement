import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
    cardtype: {
        type: String,
        required: true
    },
    cardnumber: {
        type: String,
        required: true
    },
    expiredate: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;