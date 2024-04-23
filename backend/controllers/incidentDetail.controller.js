// const db = require("../models");
// import IncidentDetails from "../models/incidentDetail.model";
import IncidentDetails from "../models/incidentDetail.model.js";

export const create = (req, res) => {
  if (!req.body.renterName) {
    res.status(400).send({ message: "Renters name cannot be empty." });
    return;
  }

  const incidentDetails = new IncidentDetails(req.body);

  //save in db
  incidentDetails
    .save(incidentDetails)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Incident details.",
      });
    });
};

export const findAll = (req, res) => {
  IncidentDetails.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Incident details.",
      });
    });
};

// // Find a single incidentDetail with an id
export const findOne = (req, res) => {
  const id = req.params.id;
  IncidentDetails.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Incident data with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Incident details with id=" + id });
    });
};

export const findAllByUserId = (req, res) => {
  const userId = req.params.id; // Extract user ID from request parameters
  IncidentDetails.find({ userId: userId }) // Find all incident details with the specified user ID
    .then((data) => {
      if (!data || data.length === 0) {
        // If no incident details found for the user ID, return a 404 status
        res
          .status(404)
          .send({ message: "No incident data found for user ID " + userId });
      } else {
        // If incident details found, return them
        res.send(data);
      }
    })
    .catch((err) => {
      // If an error occurs during the database operation, return a 500 status
      res.status(500).send({
        message: "Error retrieving incident details for user ID " + userId,
      });
    });
};

// Update a incidentDetails by the id in the request
export const update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  console.log(req.body);
  IncidentDetails.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Incident with id=${id}. Maybe Incident details was not found!`,
        });
      } else
        res.send({ message: "Incident details was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Incident details  with id=" + id,
      });
    });
};

// // Delete a IncidentDetails with the specified id in the request
export const deleteIncidentReport = (req, res) => {
  const id = req.params.id;
  IncidentDetails.findByIdAndDelete(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Incident details  with id=${id}. Maybe Incident details was not found!`,
        });
      } else {
        res.send({
          message: "Incident details  was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Incident details  with id=" + id,
      });
    });
};

// // Delete all IncidentDetails from the database.
// const deleteAll = (req, res) => {
//   IncidentDetails.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Incident details  were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while removing all Incident details.",
//       });
//     });
// };

// export default IncidentDetails;
