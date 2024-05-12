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

const DamageCostView = () => {
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
      console.log(response);
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

  return (
    <div className="py-5">
      <div className="">
        {/* <img src={searchIcon} className="search_icon" /> */}
        <div className={styles.incidentViewContainer}>
          <Container className={styles.incidentView}>
            <MainHeader name="Damage Cost" />
            <SubHeader
              name={
                "Rental agreement number : " +
                incidentData?.renterAgreementNumber
              }
            />
            {isLoading ? (
              "Loading..."
            ) : (
              <Form>
                <Form.Group className="mb-3" controlId="registerForm">
                  {incidentData?.damageType ? (
                    <Row className={styles.costHeader}>
                      <Col>Damage type : {incidentData?.damageType}</Col>
                      <Col>{incidentData?.standardCost}</Col>
                    </Row>
                  ) : (
                    "Not yet finalized the cost, will be finalized soon."
                  )}

                  {incidentData?.otherCostType1 && incidentData?.otherCost1 && (
                    <Row className={styles.otherCostRow}>
                      <Col>{incidentData?.otherCostType1}</Col>
                      <Col>{incidentData?.otherCost1}</Col>
                    </Row>
                  )}

                  {incidentData?.otherCostType2 && incidentData?.otherCost2 && (
                    <Row className={styles.otherCostRow}>
                      <Col>{incidentData?.otherCostType2}</Col>
                      <Col>{incidentData?.otherCost2}</Col>
                    </Row>
                  )}
                  {incidentData?.otherCostType3 && incidentData?.otherCost3 && (
                    <Row className={styles.otherCostRow}>
                      <Col>{incidentData?.otherCostType3}</Col>
                      <Col>{incidentData?.otherCost3}</Col>
                    </Row>
                  )}
                  {incidentData?.otherCostType4 && incidentData?.otherCost4 && (
                    <Row className={styles.otherCostRow}>
                      <Col>{incidentData?.otherCostType4}</Col>
                      <Col>{incidentData?.otherCost4}</Col>
                    </Row>
                  )}
                  {incidentData?.otherCostType5 && incidentData?.otherCost5 && (
                    <Row className={styles.otherCostRow}>
                      <Col>{incidentData?.otherCostType5}</Col>
                      <Col>{incidentData?.otherCost5}</Col>
                    </Row>
                  )}
                  {incidentData?.totalCost && (
                    <Row className={styles.costHeader}>
                      <Col>Total Cost</Col>
                      <Col>{incidentData?.totalCost}</Col>
                    </Row>
                  )}
                </Form.Group>
              </Form>
            )}
          </Container>
        </div>
      </div>
      <SideNavigation />
      {/* <Footer /> */}
    </div>
  );
};

export default DamageCostView;
