import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import searchIcon from "../../../images/home/search.png";
import SideNavigation from "../components/sideNavigation";
import Footer from "../components/Footer";
import styles from "../css/incident.module.css";
import {
  Form,
  Col,
  Container,
  Row,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetByIdMutation,
  useUpdateIncidentDataMutation,
} from "../../../slices/incidentDetailsSlice";
import { toast } from "react-toastify";
import MainHeader from "../components/MainHeader";
import SubHeader from "../components/SubHeader";
import { useForm } from "react-hook-form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import dayjs from "dayjs";
import { storage } from "../../../../firebase";

const ViewAndEditIncidentData = () => {
  const params = useParams();
  const [incidentData, setIncidentData] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState(incidentData?.incidentImages);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    // defaultValues: initialValues,
  });
  const [getById, { isLoading }] = useGetByIdMutation();
  const [updateIncidentData] = useUpdateIncidentDataMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const minDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const maxDate = dayjs().format("YYYY-MM-DD");
  const getIncidentDataById = async () => {
    try {
      const response = await getById(params.incidentReportId).unwrap();
      setIncidentData(response);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    if (!incidentData) {
      getIncidentDataById();
    }
  }, [incidentData]);

  // console.log(incidentData);

  useEffect(() => {
    setValue("renterName", incidentData?.renterName);
    setValue("rentersContactNumber", incidentData?.renterContactNumber);
    setValue("rentalAgreementNumber", incidentData?.renterAgreementNumber);
    setValue("vehicleType", incidentData?.vehicleType);
    setValue("licensePlateNumber", incidentData?.vehicleLicensePlateNumber);
    const formattedDate = dayjs(incidentData?.incidentDateTime).format(
      "YYYY-MM-DD"
    );
    setValue("incidentDateTime", formattedDate);
    setValue("incidentLocation", incidentData?.incidentLocation);
    setValue("incidentDescription", incidentData?.incidentDescription);
    setValue("witnessName", incidentData?.witnessName);
    setValue("witnessContactNumber", incidentData?.witnessContactNumber);
  }, [setValue, incidentData]);

  const onSubmit = async (values) => {
    try {
      const obj = {
        renterName: values.renterName,
        renterContactNumber: values.rentersContactNumber,
        renterAgreementNumber: values.rentalAgreementNumber,
        vehicleType: values.vehicleType,
        vehicleLicensePlateNumber: values.licensePlateNumber,
        incidentDateTime: values.incidentDateTime,
        incidentLocation: values.incidentLocation,
        incidentDescription: values.incidentDescription,
        witnessName: values.witnessName,
        witnessContactNumber: values.witnessContactNumber,
        userId: userInfo._id,
      };
      const response = await updateIncidentData({
        id: params.incidentReportId,
        data: obj,
      }).unwrap();
      toast.success(response.message);
      getIncidentDataById();
      // reset();
    } catch (error) {
      getIncidentDataById();
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="py-5">
      <div className="searchbar">
        <img src={searchIcon} className="search_icon" />
        <div className={styles.incidentViewContainer}>
          <Container className={styles.incidentView}>
            <MainHeader name="View and Edit Incident Data" />
            <SubHeader name={"Renters Information"} />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="registerForm">
                <Row>
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("renterName", {
                        required: "Required",
                        minLength: {
                          value: 3,
                          message: "At least 3 characters are required",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum 50 characters only",
                        },
                        pattern: {
                          value: /^[a-zA-Z ]*$/,
                          message:
                            "Numbers and special characters are not allowed",
                        },
                      })}
                    />
                    {errors.renterName && (
                      <Form.Text className="text-danger">
                        {errors.renterName.message}
                      </Form.Text>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("rentersContactNumber", {
                        required: "Required",
                        minLength: {
                          value: 10,
                          message: "At least 10 numbers are required",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum 20 numbers only",
                        },
                        pattern: {
                          value: /^[0-9]*$/,
                          message:
                            "Letters and special characters are not allowed",
                        },
                      })}
                    />
                    {errors.rentersContactNumber && (
                      <Form.Text className="text-danger">
                        {errors.rentersContactNumber.message}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Rental Agreement Number</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("rentalAgreementNumber", {
                        required: "Required",
                        minLength: {
                          value: 5,
                          message: "At least 5 characters are required",
                        },
                        maxLength: {
                          value: 10,
                          message: "Maximum 10 characters only",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9-]*$/,
                          message: "Special characters are not allowed",
                        },
                      })}
                    />
                    {errors.rentalAgreementNumber && (
                      <Form.Text className="text-danger">
                        {errors.rentalAgreementNumber.message}
                      </Form.Text>
                    )}
                  </Col>
                  <Col></Col>
                </Row>
                <Row>
                  <div style={{ marginTop: "1%" }}>
                    <SubHeader name={"Vehicle Information"} />
                  </div>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Select vehicle type</Form.Label>
                    <Form.Select
                      aria-label="vehicleType"
                      {...register("vehicleType", {
                        required: "Required",
                      })}
                    >
                      <option value="1">Toyota axios - 001 model</option>
                      <option value="2">Mitsubughi G7</option>
                      <option value="3">Vagenar</option>
                      <option value="4">Bajaj 150cc Pulsar</option>
                    </Form.Select>
                    {errors.vehicleType && (
                      <Form.Text className="text-danger">
                        {errors.vehicleType.message}
                      </Form.Text>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>License Plate Number </Form.Label>
                    <Form.Control
                      type="text"
                      {...register("licensePlateNumber", {
                        minLength: {
                          value: 5,
                          message: "At least 5 characters are required",
                        },
                        maxLength: {
                          value: 10,
                          message: "Maximum 10 characters only",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9-]*$/,
                          message: "Special characters are not allowed",
                        },
                      })}
                    />
                    {errors.licensePlateNumber && (
                      <Form.Text className="text-danger">
                        {errors.licensePlateNumber.message}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <div style={{ marginTop: "1%" }}>
                    <SubHeader name={"Incident Information"} />
                  </div>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                      type="date"
                      {...register("incidentDateTime", {
                        required: "Required",
                      })}
                      min={minDate} // Set the minimum date
                      max={maxDate} // Set the maximum date
                    />
                    {errors.incidentDate && (
                      <Form.Text className="text-danger">
                        {errors.incidentDate.message}
                      </Form.Text>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("incidentLocation", {
                        required: "Required",
                        minLength: {
                          value: 3,
                          message: "At least 3 characters are required",
                        },
                        maxLength: {
                          value: 60,
                          message: "Maximum 60 characters only",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9 ,-]*$/,
                          message: "Special characters are not allowed",
                        },
                      })}
                    />
                    {errors.incidentLocation && (
                      <Form.Text className="text-danger">
                        {errors.incidentLocation.message}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginTop: "1%" }}>
                    <FloatingLabel
                      controlId="incidentDescription"
                      label="Description about incident"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Description about incident"
                        style={{ height: "100px" }}
                        {...register("incidentDescription", {
                          required: "Required",
                          minLength: {
                            value: 3,
                            message: "At least 3 characters are required",
                          },
                          maxLength: {
                            value: 500,
                            message: "Maximum 500 characters only",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9 ,-]*$/,
                            message: "Special characters are not allowed",
                          },
                        })}
                      />
                    </FloatingLabel>
                    {errors.incidentDescription && (
                      <Form.Text className="text-danger">
                        {errors.incidentDescription.message}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <div style={{ marginTop: "1%" }}>
                    <SubHeader name={"Witness Information"} />
                  </div>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("witnessName", {
                        required: "Required",
                        minLength: {
                          value: 3,
                          message: "At least 3 characters are required",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum 50 characters only",
                        },
                        pattern: {
                          value: /^[a-zA-Z ]*$/,
                          message:
                            "Numbers and special characters are not allowed",
                        },
                      })}
                    />
                    {errors.witnessName && (
                      <Form.Text className="text-danger">
                        {errors.witnessName.message}
                      </Form.Text>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("witnessContactNumber", {
                        required: "Required",
                        minLength: {
                          value: 10,
                          message: "At least 10 numbers are required",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum 20 numbers only",
                        },
                        pattern: {
                          value: /^[0-9]*$/,
                          message:
                            "Letters and special characters are not allowed",
                        },
                      })}
                    />
                    {errors.witnessContactNumber && (
                      <Form.Text className="text-danger">
                        {errors.witnessContactNumber.message}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  {/* Display incident images */}
                  {incidentData && incidentData.incidentImages ? (
                    <div>
                      <SubHeader name={"Incident Images"} />
                      <div className="incident-images-container">
                        {incidentData.incidentImages.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            width={"20%"}
                            alt={`Incident Image ${index + 1}`}
                            className="incident-image"
                            onClick={() => handleImageClick(imageUrl)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <SubHeader name={"Incident Images"} />
                      No images available
                    </div>
                  )}
                </Row>
                {/* <Row>
                  <div style={{ marginTop: "1%" }}>
                    <SubHeader name={"Upload more Images"} />
                  </div>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="incidentImages" className="mb-3">
                      <Form.Label>Select Images</Form.Label>
                      <Form.Control type="file" size="lg"  />
                    </Form.Group>
                  </Col>
                </Row> */}
                <Row>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      style={{
                        backgroundColor: "rgba(85, 190, 21, 0.8)",
                        borderColor: "rgba(85, 190, 21, 0.5)",
                        width: "150px",
                        transition: "background-color 0.3s", // Add transition for smooth effect
                        outline: "none", // Remove default outline
                      }}
                      type="submit"
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "rgba(85, 190, 21, 1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor =
                          "rgba(85, 190, 21, 0.8)";
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </Row>
              </Form.Group>
            </Form>
          </Container>
        </div>
      </div>
      <SideNavigation />
      {/* <Footer /> */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Selected Incident Image"
            className="img-fluid"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewAndEditIncidentData;
