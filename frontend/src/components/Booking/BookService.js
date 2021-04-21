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
  TextField,
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
import useCustomForm from "../common/useCustomForm";
import ReactStars from "react-rating-stars-component";

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

  //for staff Rating
  const [staffPopUp, setStaffPopUp] = useState(false);

  const [choosenSpecialist, setChoosenSpecialist] = useState(null);
  const staffs = useSelector((state) => state.booking.staffs);
  const specialist = staffs.map((item) => ({
    value: item.fname,
    id: item.user_id,
  }));

  const { DropdownSelect } = useCustomForm();

  const [ratingStar, setRatingStar] = useState();

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "8rem", minHeight: "60vh" }}>
        {response && response.length > 0 && (
          <CustomSnackbar
            snackbarOpen={snackbar}
            setSnackbar={setSnackbar}
            snackType={snackType}
            snackContent={response}
          />
        )}
        <Container maxWidth="md">
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="2rem"
            padding="0.3rem"
            borderRadius="5px"
          >
            <Box display="flex">
              <Typography>Need Staffs for event?</Typography>
              <Button
                onClick={() => setOpenPopUp(true)}
                style={{
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
              <Button
                onClick={() => setStaffPopUp(true)}
                style={{
                  backgroundColor: "teal",
                  height: 30,
                  marginLeft: 15,
                  width: 200,
                }}
              >
                Rate Specialist
              </Button>
            </Box>
          </Box>
        </Container>

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
        <PopUp
          title="Rate Specialist"
          openPopup={staffPopUp}
          setOpenPopup={setStaffPopUp}
        >
          <Box width="18rem" height="20rem">
            <DropdownSelect
              title="Choose Specialist"
              name="specialist"
              id="specialist"
              value={choosenSpecialist}
              array={specialist}
              // defaultValue="Random"
              onChange={(e) => {
                // filterTime(e);
              }}
            />
            <Box display="flex">
              <Typography
                variant="caption"
                style={{ marginTop: "0.5rem", marginRight: "3rem" }}
              >
                Give Rating
              </Typography>
              <ReactStars
                count={5}
                onChange={(value) => setRatingStar(value)}
                size={24}
                activeColor="#ffd700"
              />
            </Box>
            <TextField
              variant="outlined"
              rows={3}
              multiline
              placeholder="Any feedback?"
            />
          </Box>
        </PopUp>
      </Container>
    </>
  );
}

export default BookService;
