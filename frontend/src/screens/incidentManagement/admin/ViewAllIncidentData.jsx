import React, { useEffect, useState } from "react";
import searchIcon from "../../../images/home/search.png";
import SideNavigation from "../components/sideNavigation";
import Footer from "../components/Footer";
import styles from "../css/incident.module.css";
import { Form, Col, Container, Row, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllIncidentDataAdminMutation,
  useDeleteIncidentReportMutation,
} from "../../../slices/incidentDetailsSlice";
import { toast } from "react-toastify";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/ConfirmationDialogBox";

const ViewAllIncidentData = () => {
  const [getAllIncidentDataAdmin, { isLoading }] =
    useGetAllIncidentDataAdminMutation();
  const [deleteIncidentReport] = useDeleteIncidentReportMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [incidentData, setIncidentData] = useState(null);
  const navigate = useNavigate();
  // State to manage dialog visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  // State to store the ID of the item to delete
  const [itemToDelete, setItemToDelete] = useState(null);

  const getAllIncidents = async () => {
    try {
      const response = await getAllIncidentDataAdmin().unwrap();
      setIncidentData(response);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getAllIncidents();
  }, []);

  const handleViewMoreAndEditReport = (id) => {
    // 👇️ Navigate to /contacts
    navigate(`/viewincidentdata/${id}`);
  };

  const handleOpenConfirmation = (id) => {
    setItemToDelete(id);
    setShowConfirmation(true);
  };
  // Function to handle closing the confirmation dialog
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Function to handle deletion confirmation
  const handleConfirmDelete = () => {
    handleDeleteReport(itemToDelete);
    setShowConfirmation(false);
  };

  const handleDeleteReport = async (id) => {
    try {
      const response = await deleteIncidentReport(id);
      toast.success(response.data.message);
      getAllIncidents();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="py-5">
      <div className="searchbar">
        <img src={searchIcon} className="search_icon" />
        <div className={styles.incidentViewContainer}>
          <Container className={styles.incidentView}>
            <MainHeader name="View Incident Data" />
            {isLoading ? (
              "Loading..."
            ) : (
              <Table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Rental Agreement Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {incidentData &&
                    incidentData.map((incident) => (
                      <tr key={incident._id}>
                        <td>{incident.renterName}</td>
                        <td>{incident.renterContactNumber}</td>
                        <td>{incident.renterAgreementNumber}</td>
                        <td>
                          <div style={{ display: "flex", padding: 10 }}>
                            <Button
                              // className="editBTN"
                              onClick={() =>
                                handleViewMoreAndEditReport(incident._id)
                              }
                              variant="outline-secondary"
                            >
                              View more
                              {/* <img src={edit} className="edt" /> */}
                            </Button>
                            <Button
                              // className="delBTN"
                              onClick={() =>
                                handleOpenConfirmation(incident._id)
                              }
                              variant="outline-danger"
                            >
                              Remove
                              {/* <img src={deleteicon} className="edt" /> */}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
            <ConfirmationDialog
              show={showConfirmation}
              handleClose={handleCloseConfirmation}
              handleConfirmSubmit={handleConfirmDelete}
              message={"Are you sure you want to delete this item?"}
              submitButtonVariant={"danger"}
              submitButtonText={"Yes ,delete"}
            />
          </Container>
        </div>
      </div>
      <SideNavigation />
      <Footer />
    </div>
  );
};

export default ViewAllIncidentData;
