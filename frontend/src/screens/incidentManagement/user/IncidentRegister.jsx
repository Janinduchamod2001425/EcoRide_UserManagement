import { Form, Col, Container, Row, Button } from "react-bootstrap";
import MainHeader from "../components/MainHeader";
import SubHeader from "../components/SubHeader";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styles from "../css/incident.module.css";
import SideNavigation from "../components/sideNavigation";
import searchIcon from "../../../images/home/search.png";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useSaveIncidentDataMutation } from "../../../slices/incidentDetailsSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
// import { storage } from "../../../../firebase";
import { storage } from "../../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const IncidentRegister = () => {
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
  const { userInfo } = useSelector((state) => state.auth);
  const [saveIncidentData, { isLoading }] = useSaveIncidentDataMutation();

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const minDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const maxDate = dayjs().format("YYYY-MM-DD");
  useEffect(() => {
    setValue("renterName", userInfo.name);
    setValue("rentersContactNumber", userInfo.contact);
  }, [setValue]);

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const onSubmit = async (values) => {
    const promises = [];
    const downloadURLPromises = []; // Array to hold promises for getDownloadURL

    images.forEach((image) => {
      const storageRef = ref(storage, `/incidentImages/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      const downloadURLPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            // console.log(progress);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                setUrls((prevState) => [...prevState, downloadURL]);
                resolve(downloadURL); // Resolve the promise with the downloadURL
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          }
        );
      });
      downloadURLPromises.push(downloadURLPromise); // Push the download URL promise to the array
    });

    // Wait for all upload tasks to complete
    Promise.all(promises)
      .then(() => {
        // After all upload tasks are complete, wait for all download URL promises to resolve
        Promise.all(downloadURLPromises)
          .then(async (downloadURLs) => {
            // Now all download URLs are available
            // console.log(downloadURLs);
            // Proceed with saving incident data using the download URLs
            const obj = {
              renterName: values.renterName,
              renterContactNumber: values.rentersContactNumber,
              renterAgreementNumber: values.rentalAgreementNumber,
              vehicleType: values.vehicleType,
              vehicleLicensePlateNumber: values.licensePlateNumber,
              incidentDateTime: values.incidentDate,
              incidentLocation: values.incidentLocation,
              incidentDescription: values.incidentDescription,
              witnessName: values.witnessName,
              witnessContactNumber: values.witnessContactNumber,
              userId: userInfo._id,
              incidentImages: downloadURLs,
            };
            const response = await saveIncidentData(obj).unwrap();
            toast.success("Incident Data saved successfully.");
            reset();

            // Save incident data
            // Example: await saveIncidentData(obj);
          })
          .catch((error) => toast.error(error));
      })
      .catch((error) => toast.error(error));
  };

  // console.log("images: ", urls);
  return (
    <div className="py-5">
      <div className="searchbar">
        <img src={searchIcon} className="search_icon" />
      </div>

      <div>
        <Container className={styles.incidentRegister}>
          <MainHeader name={"Add Incident Details"} />
          <SubHeader name={"Renters Information"} />
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-3" controlId="registerForm">
              <Row>
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tim David"
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
                    placeholder="7789638888"
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
                    placeholder="RA-001"
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
                    placeholder="CAB-0011"
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
                    {...register("incidentDate", {
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
                    placeholder="Colombo"
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
                    placeholder="Tim David"
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
                    placeholder="7789638888"
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
                <div style={{ marginTop: "1%" }}>
                  <SubHeader name={"Upload Images"} />
                </div>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="incidentImages" className="mb-3">
                    <Form.Label>Select Images</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      size="lg"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* <button onClick={}>Upload</button> */}
                </Col>
              </Row>
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
                      e.target.style.backgroundColor = "rgba(85, 190, 21, 0.8)";
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
      <SideNavigation />
      <Footer />
    </div>
  );
};

export default IncidentRegister;
