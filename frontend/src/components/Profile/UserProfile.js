import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Toolbar,
  ListItem,
  Avatar,
} from "@material-ui/core";
import useCustomForm from "../common/useCustomForm";

import { AiFillDelete } from "react-icons/ai";
import { FaPenSquare } from "react-icons/fa";

import ProfilePic from "../common/ProfilePic";
import CustomToolbar from "../common/CustomToolbar";

import EditDetails from "./EditDetails";
import useSettings from "./useSettings";

import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomSnackbar from "../common/CustomSnackbar";
import moment from "moment";
import { fetchAppointment } from "../../redux/Booking/booking-actions";
import { fetchProducts } from "../../redux/Ecommerce/eStore-actions";
const useStyles = makeStyles((theme) => ({
  profileName: {
    marginTop: "0.7rem",
    marginLeft: "0.8rem",
  },
}));

function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { ChangePassword, DeleteAccount } = useSettings();

  const [DetailPopUp, setDetailPopUp] = useState(false);

  const [deletePopUp, setDeletePopUp] = useState(false);

  const data = useSelector((state) => state.login.userData);
  const appointments = useSelector((state) => state.booking.appointments);

  const [userId] = data.map((item) => item.user_id);

  const recentActivities = appointments?.filter(
    (appointment) => appointment.user_id === userId
  );

  const [userData, setUserData] = useState(data);

  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  useEffect(() => {
    dispatch(fetchAppointment());
    dispatch(fetchProducts());
  }, []);

  const GridContent = ({ children, xs }) => {
    return (
      <Grid item xs={xs}>
        <Typography variant="body2" style={{ paddingBottom: "0.5rem" }}>
          {children}
        </Typography>
      </Grid>
    );
  };

  const FlexContent = ({ name, children, color = "inherit", onClick }) => {
    return (
      <Box
        display="flex"
        type="button"
        justifyContent="space-between"
        onClick={onClick}
      >
        <Typography
          color={color}
          variant="body2"
          style={{ paddingBottom: "0.7rem" }}
        >
          {name}
        </Typography>
        <Typography color={color}>{children}</Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" style={{ minHeight: "60vh" }}>
      {response && response.length > 0 && (
        <CustomSnackbar
          snackbarOpen={snackbar}
          setSnackbar={setSnackbar}
          snackType={snackType}
          snackContent={response}
        />
      )}
      {userData &&
        userData.map((item) => (
          <div key={item.user_id}>
            <ProfilePic
            // source={item.image}
            // userId={item.user_id}
            />
            <Typography
              variant="h6"
              className={classes.profileName}
              align="center"
            >
              {item.fname} {item.lname}
            </Typography>

            <Grid
              container
              component="div"
              spacing={4}
              style={{ marginTop: "1rem" }}
            >
              <Grid item xs={12} sm={6}>
                <Paper>
                  <CustomToolbar button="true" title="Personal Details">
                    <Button onClick={() => setDetailPopUp(true)}>
                      <FaPenSquare size={20} />
                    </Button>
                  </CustomToolbar>
                  {/* to open popup */}
                  <EditDetails
                    detailPopUp={DetailPopUp}
                    setDetailPopUp={setDetailPopUp}
                    data={item}
                    setResponse={setResponse}
                    setSnackType={setSnackType}
                    setSnackbar={setSnackbar}
                  />

                  <Box
                    style={{
                      padding: "0.5rem 1.5rem 1rem 1.5rem",
                      overflow: "hidden",
                    }}
                  >
                    <Grid container component="div">
                      <GridContent xs={4}>Name</GridContent>
                      <GridContent xs={6}>
                        {item.fname} {item.lname}
                      </GridContent>
                    </Grid>
                    <Grid container component="div">
                      <GridContent xs={4}>Email</GridContent>
                      <GridContent xs={6}>{item.email}</GridContent>
                    </Grid>
                    <Grid container component="div">
                      <GridContent xs={4}>Birthday</GridContent>
                      <GridContent xs={6}>
                        {item.dob ? item.dob : <>-</>}
                      </GridContent>
                    </Grid>
                    <Grid container component="div">
                      <GridContent xs={4}>Contact</GridContent>
                      <GridContent xs={6}>
                        {item.phone ? item.phone : <>-</>}
                      </GridContent>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              {/* settings */}
              <Grid item xs={12} sm={6}>
                <Paper>
                  <CustomToolbar title="Account Settings" />
                  <Box style={{ padding: "0.5rem 1.5rem 0.5rem 1.5rem" }}>
                    {/* <FlexContent name="Change Password">
                <IoIosRepeat size={18} />
              </FlexContent> */}
                    <FlexContent
                      color="error"
                      name="Delete Account"
                      onClick={() => {
                        setDeletePopUp(true);
                      }}
                    >
                      <AiFillDelete size={18} />
                    </FlexContent>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <DeleteAccount
              deletePopUp={deletePopUp}
              setDeletePopUp={setDeletePopUp}
              userId={item.user_id}
            />

            {/* <PopUp
        openPopUp={deletePopUp}
        setOpenPopUp={setDeletePopUp}
        title="Alert"
      >
        <Box width="12rem">
          <Typography>
            Deleting your account will remove all the records from our database.
          </Typography>
          <Button>Proceed</Button>
          <Button>Abort</Button>
        </Box>
      </PopUp> */}

            {/* recent activities */}
            <Paper style={{ marginTop: "2rem" }}>
              {recentActivities?.length > 0 && (
                <CustomToolbar title="Recent Activities" />
              )}
              {item.role === "C" &&
                recentActivities.map((item) => (
                  <Toolbar>
                    Booked {item.serviceName} with {item.staff_name} on{" "}
                    {moment(item.date).format("YYYY/MM/DD")} at {item.time}{" "}
                    {item.payment === "offline" || item.payment === " "
                      ? `Choosen Payment method is ${item.payment}`
                      : "Payment not done."}
                  </Toolbar>
                ))}
            </Paper>
          </div>
        ))}
    </Container>
  );
}
export default withRouter(UserProfile);
