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
import { useState } from "react";

const IncidentRegister = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    // defaultValues: initialValues,
  });
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo._id);
  const [saveIncidentData, { isLoading }] = useSaveIncidentDataMutation();

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const onSubmitt = async (values) => {
    try {
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
      };
      const response = await saveIncidentData(obj).unwrap();
      toast.success("Incident Data saved successfully.");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };
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
    images.map((image) => {
      // const uploadTask = storage.ref(`incidentimages/${image.name}`).put(image);
      // promises.push(uploadTask);
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.byteTransferred / snapshot.totalBytes) * 100
      //     );
      //     setProgress(progress);
      //   },
      //   (error) => {
      //     toast.error(error);
      //   },
      //   async () => {
      //     await storage
      //       .ref("incidentimages")
      //       .child(image.name)
      //       .getDownloadURL()
      //       .then((urls) => {
      //         setUrls((prevState) => [...prevState, urls]);
      //       });
      //   }
      // );
      const storageRef = ref(storage, `/incidentImages/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setUrls((prevState) => [...prevState, downloadURL]);
          });
        }
      );
    });
    if (urls) {
      try {
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
          incidentImages: urls,
        };
        const response = await saveIncidentData(obj).unwrap();
        toast.success("Incident Data saved successfully.");
        reset();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    }
    // Promise.all(promises)
    //   .then(() => toast.success("All images have been uploaded."))
    //   .catch((error) => toast.error(error));
  };
  // const onSubmit = async (values) => {
  //   const promises = [];
  //   images.map((image) => {
  //     const storageRef = ref(storage, `/incidentImages/${image.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, image);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setProgress(progress);
  //         console.log(progress);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       async () => {
  //         // Make the callback function asynchronous
  //         try {
  //           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //           console.log(downloadURL);
  //           setUrls((prevState) => [...prevState, downloadURL]);

  //           if (urls) {
  //             const obj = {
  //               renterName: values.renterName,
  //               renterContactNumber: values.rentersContactNumber,
  //               renterAgreementNumber: values.rentalAgreementNumber,
  //               vehicleType: values.vehicleType,
  //               vehicleLicensePlateNumber: values.licensePlateNumber,
  //               incidentDateTime: values.incidentDate,
  //               incidentLocation: values.incidentLocation,
  //               incidentDescription: values.incidentDescription,
  //               witnessName: values.witnessName,
  //               witnessContactNumber: values.witnessContactNumber,
  //               userId: userInfo._id,
  //               incidentImages: urls,
  //             };
  //             console.log("FE", obj);
  //             const response = await saveIncidentData(obj).unwrap();
  //             toast.success("Incident Data saved successfully.");
  //             // setImages([]);
  //             // setUrls([]);
  //             reset();
  //           }
  //         } catch (error) {
  //           console.log(error);
  //           toast.error("Something went wrong.");
  //         }
  //       }
  //     );
  //   });
  // };

  // console.log("images: ", images);
  console.log("urls", urls);
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
                    {...register("renterName", { required: "Required" })}
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
                      required: "Required",
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
