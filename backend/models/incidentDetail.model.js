// module.exports = (mongoose) => {
//   var schema = mongoose.Schema(
//     {
//       renterName: String,
//       renterContactNumber: String,
//       renterAgreementNumber: String,
//       vehicleType: String,
//       vehicleLicensePlateNumber: String,
//       incidentDateTime: Date,
//       incidentLocation: String,
//       incidentDescription: String,
//       witnessName: String,
//       witnessContactNumber: String,
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const IncidentDetail = mongoose.model("incident_detail", schema);

//   return IncidentDetail;
// };

import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    renterName: String,
    renterContactNumber: String,
    renterAgreementNumber: String,
    vehicleType: String,
    vehicleLicensePlateNumber: String,
    incidentDateTime: Date,
    incidentLocation: String,
    incidentDescription: String,
    witnessName: String,
    witnessContactNumber: String,
    userId: String,
  },
  { timestamps: true }
);

export default mongoose.model("IncidentSchema", incidentSchema);
