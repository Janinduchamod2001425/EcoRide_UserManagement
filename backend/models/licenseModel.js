import mongoose from "mongoose";

const licenseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    issuedate: {
      type: Date,
      required: true,
    },
    expiredate: {
      type: Date,
      required: true,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    licensevehicle: {
      type: String,
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const License = mongoose.model("License", licenseSchema);

export default License;
