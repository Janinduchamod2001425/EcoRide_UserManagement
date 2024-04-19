import mongoose from "mongoose";

const packageSchema = mongoose.Schema({
    packname: {
        type: String,
        requireed: true,
    },
    description: {
        type: String,
        requireed: true,
    },
    vehicletype: {
        type: String,
        requireed: true,
    },
    duration: {
        type: String,
        requireed: true,
    },
    price: {
        type: String,
        requireed: true,
    },
}, {
    timestamps: true
});

const Package = mongoose.model('Package', packageSchema);

export default Package;