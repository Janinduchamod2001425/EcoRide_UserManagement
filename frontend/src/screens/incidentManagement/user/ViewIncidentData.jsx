import React, { useEffect, useState } from "react";
import searchIcon from "../../../images/home/search.png";
import SideNavigation from "../components/sideNavigation";
import Footer from "../components/Footer";
import styles from "../css/incident.module.css";
import { Form, Col, Container, Row, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllIncidentDataMutation,
  useDeleteIncidentReportMutation,
} from "../../../slices/incidentDetailsSlice";
import { toast } from "react-toastify";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/ConfirmationDialogBox";
import { BsSearch } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPencil, BsTrash, BsPencilSquare } from "react-icons/bs";
import { HiDocumentDuplicate } from "react-icons/hi2";

const ViewIncidentData = () => {
  const [getAllIncidentData, { isLoading }] = useGetAllIncidentDataMutation();
  const [deleteIncidentReport] = useDeleteIncidentReportMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [incidentData, setIncidentData] = useState(null);
  const navigate = useNavigate();
  // State to manage dialog visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  // State to store the ID of the item to delete
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllIncidents = async () => {
    try {
      const response = await getAllIncidentData(userInfo._id).unwrap();
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
    navigate(`/viewandeditincidentdata/${id}`);
  };
  const handleViewDamageCost = (id) => {
    // 👇️ Navigate to /contacts
    navigate(`/viewDamageCost/${id}`);
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

  //search
  useEffect(() => {
    filterIncidentsByRentalAgreement();
  }, [searchQuery]);

  const filterIncidentsByRentalAgreement = () => {
    if (searchQuery === "") {
      setIncidentData(null); // Restore original incident data
      getAllIncidents();
      return;
    }
    const filteredIncidents = incidentData.filter((incident) =>
      incident.renterAgreementNumber.includes(searchQuery)
    );
    setIncidentData(filteredIncidents);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="py-5">
      <div className="">
        {/* <img src={searchIcon} className="search_icon" /> */}
        <div className={styles.incidentViewContainer}>
          <div className={styles.searchBar}>
            <Row>
              <Col>
                <div className={styles.inputContainer}>
                  <div className={styles.inputWithIcon}>
                    <input
                      type="text"
                      placeholder="Search by Rental Agreement Number"
                      value={searchQuery}
                      onChange={handleSearch}
                      className={styles.customInput}
                    />
                    <BsSearch className={styles.searchIcon} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
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
                          <div
                            style={{
                              display: "flex",
                              padding: 10,
                              justifyContent: "center",
                            }}
                          >
                            {/* <Button
                              onClick={() =>
                                handleViewMoreAndEditReport(incident._id)
                              }
                              variant="outline-secondary"
                              style={{ margin: "0 2% 0 2%" }}
                            >
                              View & Edit
                            </Button>
                            <Button
                              onClick={() =>
                                handleOpenConfirmation(incident._id)
                              }
                              variant="outline-danger"
                            >
                              Remove
                            </Button> */}
                            {/* <Button
                              // className="editBTN"
                              onClick={() =>
                                handleViewMoreAndEditReport(incident._id)
                              }
                              variant="outline-secondary"
                              style={{ margin: "0 2% 0 2%" }}
                            >
                              cost
                            </Button> */}
                            {/* <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="view-edit-tooltip">
                                  View & Edit
                                </Tooltip>
                              }
                            >
                              <Button
                                variant="outline"
                                style={{ margin: "0 2% 0 2%" }}
                                onClick={() =>
                                  handleViewMoreAndEditReport(incident._id)
                                }
                              >
                                <BsPencilSquare />
                              </Button>
                            </OverlayTrigger> */}

                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="view-edit-tooltip">
                                  View & Edit
                                </Tooltip>
                              }
                            >
                              <Button
                                variant="outline"
                                style={{ margin: "0 2% 0 2%" }}
                                onClick={() =>
                                  handleViewMoreAndEditReport(incident._id)
                                }
                              >
                                <BsPencilSquare />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="cost-tooltip">Cost</Tooltip>
                              }
                            >
                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleViewDamageCost(incident._id)
                                }
                              >
                                <HiDocumentDuplicate color="green" />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="remove-tooltip">Remove</Tooltip>
                              }
                            >
                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleOpenConfirmation(incident._id)
                                }
                              >
                                <BsTrash color="red" />
                              </Button>
                            </OverlayTrigger>
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

export default ViewIncidentData;
