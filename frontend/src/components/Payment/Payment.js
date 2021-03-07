import React from "react";
import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "../scss/payment.scss";
import { Link, useHistory } from "react-router-dom";
import useKhaltiCheckout from "./useKhaltiCheckout";
import { useSelector, useDispatch } from "react-redux";
import { handlePayment } from "../../redux/Booking/booking-actions";

export default function Payment() {
  const { checkout } = useKhaltiCheckout();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const userId = userData.map((item) => item.user_id);

  const offline = "offline";
  const online = "online";

  let history = useHistory();
  return (
    <Container maxWidth="md" style={{ marginTop: "9rem" }}>
      <Typography align="center" variant="h5">
        Choose your preferred payment method{" "}
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        style={{ marginTop: "3rem" }}
      >
        <Grid item xs={6}>
          {/* <Link to="/"> */}
          <Paper
            className="paper"
            onClick={() => {
              handlePayment(userId, offline);
              setTimeout(() => {
                // history.goBack("/#services");
              }, 1500);
            }}
          >
            <img
              src={require("../../images/other/cash-in-hand.png").default}
              alt="cash in hand"
              className="image-payment"
            />
          </Paper>
          {/* </Link> */}
          <Typography align="center" variant="h6" className="text">
            Cash in Hand
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className="paper"
            onClick={() => {
              checkout();
              handlePayment(userId, offline);
              setTimeout(() => {
                // history.push("/#services");
              }, 1500);
            }}
          >
            <img
              src={require("../../images/other/online-payment.png").default}
              alt="online payment"
              className="image-payment"
            />
          </Paper>

          <Typography align="center" variant="h6" className="text">
            Online Payment
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
