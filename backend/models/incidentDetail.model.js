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
    incidentImages: [String],
    damageType: String,
    standardCost: String,
    otherCostType1: String,
    otherCostType2: String,
    otherCostType3: String,
    otherCostType4: String,
    otherCostType5: String,
    otherCost1: String,
    otherCost2: String,
    otherCost3: String,
    otherCost4: String,
    otherCost5: String,
    totalCost: String,
  },
  { timestamps: true }
);

export default mongoose.model("IncidentDetails", incidentSchema);
