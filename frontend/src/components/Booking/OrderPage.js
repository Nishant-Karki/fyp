import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import { FaCheckCircle } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";

import "../scss/orderpage.scss";
import useCustomForm from "../common/useCustomForm";
import CustomSnackbar from "../common/CustomSnackbar";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  bookAppointment,
  fetchStaffs,
} from "../../redux/Booking/booking-actions";
import axios from "axios";
import moment from "moment";

function OrderPage() {
  const { DropdownSelect, CustomDatePicker } = useCustomForm();

  useEffect(() => {
    dispatch(fetchStaffs());
  }, []);

  const item = useSelector((state) => state.booking.currentItem);
  const userData = useSelector((state) => state.login.userData);

  const [choosenTime, setChoosenTime] = useState(null);
  const [choosenSpecialist, setChoosenSpecialist] = useState(null);

  const appointments = useSelector((state) => state.booking.appointments);

  const authToken = useSelector((state) => state.login.authToken);

  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  const dispatch = useDispatch();

  const staffs = useSelector((state) => state.booking.staffs);
  const specialist = staffs.map((item) => ({
    value: item.fname,
    id: item.user_id,
  }));

  //to get tommorows date
  const todayMoment = moment();
  const tommorowMoment = todayMoment.clone().add(1, "days");
  const tommorowDate = moment.utc(tommorowMoment._d).format("YYYY-MM-DD");

  const [appointmentDate, setappointmentDate] = useState(tommorowDate);

  // const SpecialistsAvailable = [
  //   { id: 1, name: "Luffy" },
  //   { id: 2, name: "Chopper" },
  //   { id: 3, name: "Nami" },
  //   { id: 4, name: "Zoro" },
  //   { id: 5, name: "Sanji" },
  // ];

  const TimeAvailable = [
    { value: "9:00-10:00", id: "9-10" },
    { value: "10:00-11:00", id: "10-11" },
    { value: "11:00-12:00", id: "11-12" },
    { value: "2:00-3:00", id: "2-3" },
    { value: "3:00-4:00", id: "3-4" },
    { value: "4:00-5:00", id: "4-5" },
  ];
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    let userId;
    let timeId;

    // TimeAvailable.map((item) => (timeId = item.id));
    // if (authToken !== null) {
    if (userData.length > 0) {
      if (choosenSpecialist !== null) {
        userData.map((user) => (userId = user.user_id));

        axios
          .post("/bookAppointment", {
            serviceId: item.service_id,
            userId: userId,
            time: choosenTime,
            date: appointmentDate,
            specialist: choosenSpecialist,
          })
          .then((res) => {
            setSnackbar(true);
            setResponse(res.data.message);
            setSnackType(res.data.type);

            if (res.data.type === "success") {
              setTimeout(() => {
                dispatch(
                  bookAppointment(
                    item.service_id,
                    item.name,
                    item.image,
                    item.price,
                    userId,
                    choosenTime,
                    appointmentDate,
                    choosenSpecialist
                  )
                );
                history.goBack();
              }, 1234);
            }
          });

        // dispatch(
        //   bookAppointment(item.service_id, userId, time, choosenSpecialist)
        // );
      } else {
        setSnackbar(true);
        setResponse("Please provide all the Details");
        setSnackType("error");
      }
    } else {
      history.push("/login");
    }
    // }
  };

  const filterTime = (e) => {
    setChoosenSpecialist(e.target.value);
    // axios.get("/getAppointment").then((res) => console.log("sadasd"));
  };

  return (
    <>
      {response && response.length > 0 && (
        <CustomSnackbar
          snackbarOpen={snackbar}
          setSnackbar={setSnackbar}
          snackType={snackType}
          snackContent={response}
        />
      )}
      <Container style={{ paddingTop: "8rem" }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item sm={12} md={6} style={{ marginTop: "3rem" }}>
            <Box
              style={{
                borderRadius: "0.7rem",
                overflow: "hidden",
              }}
            >
              <img
                src={require(`../../images/services/${item.image}`).default}
                alt="container"
                className="itemImage"
              />
            </Box>
            <Box className="image-subText">
              <Typography>
                <FaCheckCircle className="icons" />
                100% Customer Satisfaction
              </Typography>
              <Typography>
                <FaCheckCircle className="icons" />
                Cancel Appointment Anytime
              </Typography>
              <Typography>
                <SiCashapp className="icons" />
                Payment method of your choice
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                {item.name}
              </Typography>

              <Box className="product-info">
                <Box className="price">Rs. {item.price}</Box>
                <Typography variant="caption" className="price-subText">
                  Exclusive of taxes
                </Typography>
              </Box>
              <Box className="description">
                <Typography>{item.description}</Typography>
              </Box>
              <Box marginBottom="1rem" marginTop="1rem">
                <Typography htmlFor="date-picker" variant="caption">
                  Choose Date
                </Typography>
                <br />
                <CustomDatePicker
                  name="date"
                  id="date-picker"
                  disablePast
                  style={{ width: "18rem" }}
                  value={appointmentDate}
                  onChange={(value) => console.log(value)}
                />
              </Box>

              {specialist && (
                <DropdownSelect
                  title="Choose Specialist"
                  name="specialist"
                  id="specialist"
                  value={choosenSpecialist}
                  array={specialist}
                  // defaultValue="Random"
                  onChange={(e) => {
                    filterTime(e);
                  }}
                />
              )}
              {TimeAvailable && (
                <DropdownSelect
                  title="Time Available"
                  name="time"
                  id="time"
                  value={choosenTime}
                  array={TimeAvailable}
                  onChange={(e) => {
                    setChoosenTime(e.target.value);
                  }}
                />
              )}

              <Button
                onClick={onSubmit}
                style={{
                  backgroundColor: "teal",
                  color: "white",
                  width: "14rem",
                  padding: "0.6rem",
                  borderRadius: "0.7rem",
                  margin: "0.5rem",
                  marginLeft: "2rem",
                }}
              >
                Book Appointment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default OrderPage;
