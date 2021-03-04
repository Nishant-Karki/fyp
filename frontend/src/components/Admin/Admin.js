import React, { useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import {
  Grid,
  Container,
  makeStyles,
  Paper,
  Box,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../../redux/Booking/booking-actions";
import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "14rem",
    width: "18rem",
  },
  box: {
    height: "14rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Admin() {
  const appointments = useSelector((state) => state.booking.appointments);
  const staffs = useSelector((state) => state.booking.staffs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointment());
  }, []);

  const classes = useStyles();
  const GridContainer = (props) => {
    const { number, title } = props;
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper className={classes.paper}>
          <Typography
            align="center"
            style={{ paddingTop: "1rem", marginBottom: "-2rem" }}
          >
            {title}
          </Typography>
          <Box className={classes.box}>
            <Typography variant="h1">
              <CountUp end={number} duration={3} />
            </Typography>
          </Box>
        </Paper>
      </Grid>
    );
  };
  return (
    <AdminDashboard>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <GridContainer
            number={appointments.length}
            title="Appointment Count"
          />
          <GridContainer number={staffs.length} title="Staff Count" />
          <GridContainer
            number={appointments.length}
            title="Total Appointment"
          />
        </Grid>
      </Container>
    </AdminDashboard>
  );
}
