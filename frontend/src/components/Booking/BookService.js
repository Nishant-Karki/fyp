import React, { useState, useEffect } from "react";
import axios from "axios";
import PopUp from "../common/PopUp";
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchAppointment,
  fetchServices,
  fetchStaffs,
  fetchUserAppointment,
  loadCurrentService,
} from "../../redux/Booking/booking-actions";
import ContactForm from "../common/ContactForm";
import CustomSnackbar from "../common/CustomSnackbar";

function BookService() {
  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  useEffect(() => {
    dispatch(fetchServices());
    let id;
    userData !== undefined && userData.map((item) => (id = item.user_id));
    dispatch(fetchUserAppointment(id));
    dispatch(fetchStaffs());
    dispatch(fetchAppointment());
  }, []);

  const services = useSelector((state) => state.booking.services);

  //for popup
  const [openPopUp, setOpenPopUp] = useState(false);
  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "8rem" }}>
        {response && response.length > 0 && (
          <CustomSnackbar
            snackbarOpen={snackbar}
            setSnackbar={setSnackbar}
            snackType={snackType}
            snackContent={response}
          />
        )}
        <Box
          display="flex"
          marginBottom="2rem"
          padding="0.3rem"
          width="40rem"
          borderRadius="5px"
          float="right"
        >
          <Typography>Need Staffs for event?</Typography>
          <Button
            onClick={() => setOpenPopUp(true)}
            style={{
              marginTop: -3,
              backgroundColor: "teal",
              height: 30,
              marginLeft: 15,
              width: 200,
            }}
          >
            Book Staffs
          </Button>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {services?.map((item) => (
              <Grid key={item.product_id} item xs={12} sm={6} md={3}>
                <Paper className="product-container">
                  <Box className="image-container">
                    <img
                      src={
                        require(`../../images/services/${item.image}`).default
                      }
                      alt="product-img"
                      className="image"
                    />
                  </Box>
                  <Box textAlign="center" marginTop="0.3rem">
                    <Typography align="center" variant="body1">
                      {item.name}
                    </Typography>
                    <Typography align="center" variant="body1">
                      Rs. {item.price}
                    </Typography>
                    <Link
                      to={`/booking/${item.service_id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={() => dispatch(loadCurrentService(item))}
                    >
                      <Button
                        style={{
                          marginBottom: "0.6rem",
                          backgroundColor: "teal",
                          marginTop: "0.3rem",
                          width: "9rem",
                        }}
                      >
                        <Typography variant="caption">BOOK NOW</Typography>
                      </Button>
                    </Link>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        <PopUp
          title="Staffs For Event"
          openPopup={openPopUp}
          setOpenPopup={setOpenPopUp}
        >
          <ContactForm
            subject="Staffs Required for Events --"
            staff="true"
            setResponse={setResponse}
            setSnackType={setSnackType}
            setSnackbar={setSnackbar}
          />
        </PopUp>
      </Container>
    </>
  );
}

export default BookService;
