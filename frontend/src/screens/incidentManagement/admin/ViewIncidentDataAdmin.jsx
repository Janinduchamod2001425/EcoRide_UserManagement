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
// import PDFDocument from "../components/PDFDocument";
import PDFDocumentGenerate from "../components/GeneratePDF";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const ViewIncidentDataAdmin = () => {
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
  const [showPDF, setShowPDF] = useState(false);

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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleDownloadPDF = () => {
    setShowPDF(true);
  };

  const generatePDF = async () => {
    try {
      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create();

      // Embed the Times Roman font
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      // Add a blank page to the document
      const page = pdfDoc.addPage();

      // Get the width and height of the page
      const { width, height } = page.getSize();

      // Draw incident data onto the page
      const fontSize = 12;
      const textX = 50;
      let textY = height - 50;

      // const drawText = (text) => {
      //   page.drawText(text, {
      //     x: textX,
      //     y: textY,
      //     size: fontSize,
      //     font: timesRomanFont,
      //     color: rgb(0, 0, 0),
      //   });
      //   textY -= 20; // Move to the next line
      // };
      const drawText = (label, value) => {
        // Calculate the width of the label text
        const labelWidth = timesRomanFont.widthOfTextAtSize(label, fontSize);

        // Set the position to start drawing the label
        const labelX = textX;
        const labelY = textY;

        // Set the position to start drawing the value, considering the space after the label
        const valueX = textX + labelWidth + 10; // Adjust the spacing as needed
        const valueY = textY;

        // Draw the label
        page.drawText(label, {
          x: labelX,
          y: labelY,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        // Draw the value
        page.drawText(value, {
          x: valueX,
          y: valueY,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        textY -= 20; // Move to the next line
      };

      drawText("Incident Report of : ", incidentData.renterAgreementNumber);
      textY -= 20; // Move to the next line

      // Draw incident data onto the page
      drawText("Renter Name:", incidentData.renterName);
      textY -= 10;
      drawText("Renter Contact Number:", incidentData.renterContactNumber);
      textY -= 10;
      // console.log(incidentData.renterAgreementNumber);
      drawText("Renter Agreement Number:", incidentData.renterAgreementNumber);
      textY -= 10;
      drawText("Vehicle Type:", incidentData.vehicleType);
      textY -= 10;
      drawText(
        "Vehicle License Plate Number:",
        incidentData.vehicleLicensePlateNumber
      );
      textY -= 10;
      const formattedDate = dayjs(incidentData?.incidentDateTime).format(
        "YYYY-MM-DD"
      );
      drawText("Incident Time:", formattedDate);
      textY -= 10;
      drawText("Incident Location:", incidentData.incidentLocation);
      textY -= 10;
      drawText("Incident Description:", incidentData.incidentDescription);
      textY -= 10;
      drawText("Witness Name:", incidentData.witnessName);
      textY -= 10;
      drawText("Witness Contact Number:", incidentData.witnessContactNumber);
      textY -= 10;

      // Add images to the PDF
      // const imageUrls = incidentData.incidentImages; // Replace with your array of image URLs

      // for (const imageUrl of imageUrls) {
      //   const imageBytes = await fetch(imageUrl).then((response) =>
      //     response.arrayBuffer()
      //   );
      //   const image = await pdfDoc.embedJpg(imageBytes);
      //   const imageSize = image.scale(0.5); // Adjust the scale as needed

      //   const imageX = 50; // X coordinate of the image
      //   const imageY = textY; // Y coordinate of the image
      //   page.drawImage(image, {
      //     x: imageX,
      //     y: imageY,
      //     width: imageSize.width,
      //     height: imageSize.height,
      //   });

      //   textY -= imageSize.height + 20; // Move to the next line after the image
      // }

      // Add more incident data as needed

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();

      // Convert PDF bytes to a Blob
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a link element to trigger download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "incident_report.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="py-5">
      <div className="searchbar">
        <img src={searchIcon} className="search_icon" />
        <div className={styles.incidentViewContainer}>
          <Container className={styles.incidentView}>
            <Row>
              <Col>
                <MainHeader name="View Incident Data" />
              </Col>
              <Col>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    style={{
                      backgroundColor: "rgba(85, 190, 21, 0.8)",
                      borderColor: "rgba(85, 190, 21, 0.5)",
                      width: "220px",
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
                    onClick={generatePDF}
                  >
                    Click to download report
                  </Button>
                </div>
              </Col>
            </Row>
            <SubHeader name={"Renters Information"} />
            <Form>
              <Form.Group className="mb-3" controlId="registerForm">
                <Row>
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("renterName", { required: "Required" })}
                      readOnly="true"
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
                      })}
                      readOnly="true"
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
                      })}
                      readOnly="true"
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
                      readOnly="true"
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
                        required: "Required",
                      })}
                      readOnly="true"
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
                      readOnly="true"
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
                      })}
                      readOnly="true"
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
                        readOnly="true"
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
                      })}
                      readOnly="true"
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
                      })}
                      readOnly="true"
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
                  {incidentData &&
                  incidentData.incidentImages &&
                  incidentData.incidentImages.length > 0 ? (
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
                {/* <Row>
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
                </Row> */}
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

      {/* PDF viewer */}
      {/* {showPDF && <PDFDocumentGenerate data={incidentData} />} */}
    </div>
  );
};

export default ViewIncidentDataAdmin;
